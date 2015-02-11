console.log('Sample Commonplace App');

define(
    'main',
    [
        'helpers',  // Must come before mostly everything else.
        'helpers_local',
        'forms',  // Comment this if your app has no forms.
        'l10n',
        'log',
        'login',  // Comment this if your app does not have accounts.
        'navigation',
        'templates',
        'user',  // Comment this if your app does not have accounts.
        'z'
    ],
function() {
    var console = require('log')('main');
    var z = require('z');

    console.log('Dependencies resolved, starting init');

    z.body.addClass('html-' + require('l10n').getDirection());

    // Do some last minute template compilation.
    z.page.on('reload_chrome', function() {
        console.log('Reloading chrome');
        var nunjucks = require('templates');
        $('#site-header').html(
            nunjucks.env.render('_includes/header.html'));
        $('#site-footer').html(
            nunjucks.env.render('_includes/footer.html'));

        z.body.toggleClass('logged-in', require('user').logged_in());
        z.page.trigger('reloaded_chrome');
    }).trigger('reload_chrome');

    z.page.one('loaded', function() {
        z.body.addClass('loaded');
    });

    z.body.on('click', '.site-header .back', function(e) {
        e.preventDefault();
        console.log('← button pressed');
        require('navigation').back();
    });

    z.body.on('click', '.hamburger', function(e) {
        e.preventDefault();
        console.log('Menu visiblity toggled');
        z.body.toggleClass('show-nav');
    });

    // Perform initial navigation.
    console.log('Triggering initial navigation');
    z.page.trigger('navigate', [window.location.pathname + window.location.search]);

    console.log('Initialization complete');
});
