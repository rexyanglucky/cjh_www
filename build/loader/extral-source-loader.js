module.exports = function (source, map) {
  this.callback(
    null,
    `
  export default function(Component) {
   
    if (!Component.options.beforeCreate) {
      Component.options.beforeCreate = [];
    }
    Component.options.beforeCreate.push(function(){
      ${source}.split(',').forEach(url => {
        if (url) {
          loadSource(url);
        }
      });
    })
    if (!Component.options.beforeDestroy) {
      Component.options.beforeDestroy = [];
    }
    Component.options.beforeDestroy.push(function(){
      ${source}.split(',').forEach(url => {
        if (url) {
          unloadSource(url);
        }
      });
    })
  
    function unloadSource(url) {
      const link = document.querySelector('link[href="' + url + '"]');
      if (link) {
        link.remove();
      }
    }
    function loadSource(url) {
      const link = document.createElement('link');
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.href = url;
      document.head.append(link);
    }
  }
  `,
    map
  );
};
