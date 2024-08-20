let is_repl = () => {
  return /\/repl/.test(window.location.pathname);
};

let is_docs = () => {
  return /\/docs/.test(window.location.pathname);
};

let get_base_url = (most_recent_version, version) => {
  return most_recent_version == version ? "/" : "/" + version + "/";
};

let get_versioned_page = (most_recent_version, version) => {
  if (is_repl()) {
    return `/repl/?v=${version}`;
  }
  else if (is_docs()) {
    return `${get_base_url(most_recent_version, version)}docs`;
  }
  else {
    return get_base_url(most_recent_version, version);
  }
};

let handle_version_change = (e, most_recent_version) => {
  window.location.assign(get_versioned_page(most_recent_version, e.target.value));
};

let mk_option = (selected) => (opt) => {
  return `
    <option${opt == selected ? " selected" : ""}>
      ${opt}
    </option>
  `;
};

let mk_select = (opts, selected) => {
  return `
    <select onchange="handle_version_change(event, '${opts[0]}')" style="color:black">
      ${opts.map(mk_option(selected)).join("")}
    </select>
  `;
};

let get_active_version = (versions, active_version) => {
  if (is_repl()) {
    // we do not have separate html for each version for repl
    // so check url for version
    let url = new URL(window.location);
    return url.searchParams.get("v") ?? active_version;
  }
  else {
    return active_version;
  }
};

let get_all_versions = async () => {
  let headers = new Headers();
  headers.append('Pragma', 'no-cache');
  headers.append('Cache-Control', 'no-cache');
  return fetch("/versions.json", {
    method: "GET",
    headers
  }).then(r => r.json());
};

let get_version_info = async () => {
  let version_container_el = document.querySelector('.version');
  if (version_container_el == null) return {};
  let versions = await get_all_versions();
  let active_version = get_active_version(versions, version_container_el.dataset.version);
  return { version_container_el, versions, active_version };
};

let init_repl_nav_links = (versions, active_version) => {
  if (!is_repl()) return;
  let base_url = get_base_url(versions[0], active_version);
  let docs_link = document.querySelector('.docs-link');
  docs_link.setAttribute("href", `${base_url}docs`);
  let home_link = document.querySelector('.home-link');
  home_link.setAttribute("href", `${base_url}`);
};

let init = async () => {
  let { version_container_el, versions, active_version } = await get_version_info();
  if (version_container_el == null) return;
  version_container_el.innerHTML = mk_select(versions, active_version);
  init_repl_nav_links(versions, active_version);
};

document.addEventListener('DOMContentLoaded', init);

