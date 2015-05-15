module.exports = 
  '<!DOCTYPE html>' +
  '<html>' +
    '<head>' +
      '<link rel="canonical" href="http://ramdajs.com/{{redirTo}}" />' +
      '<script>window.location = "{{redirTo}}" + window.location.hash;</script>' +
    '</head>' +
    '<body></body>' +
  '</html>\n';
