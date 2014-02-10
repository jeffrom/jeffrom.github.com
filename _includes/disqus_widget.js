/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR
   WEBPAGE * * */

// required: replace example with your forum shortname
var disqus_shortname = 'jeffro';

function disqus_config() {
  this.callbacks.onReady.push(function() {
    Resize.set_doc_height();
  });
}

/* * * DON'T EDIT BELOW THIS LINE * * */
(function() {
  var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
  dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();

