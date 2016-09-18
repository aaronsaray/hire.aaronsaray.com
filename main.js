$(function() {
    /**
     * Main Website functionality
     * @returns {{init: init}}
     * @constructor
     */
    var Website = function() {

        /**
         * The numeric display
         * @type {any}
         */
        var $loaderPercentage = $('#loader-percentage');

        /**
         * The box that controls the slider
         * @type {any}
         */
        var $loaderDisplay = $('#loader-display');

        /**
         * This holds the assets we'll be using moving forward.
         * Basically this is the source info - and then there is a property added on of name 'object' which is the player
         */
        var assets = {
            "intro-audio": {
                type: "Audio",
                src: "assets/intro.mp3"
            },
            "scene1-voice": {
                type: "Audio",
                src: "assets/scene1.m4a"
            },
            "scene1-background": {
                type: "Audio",
                src: "assets/scene1-background.m4a"
            }
        };

        /**
         * This is just a shortcut to set a timeout for a scheduled item - and backwards syntax cuz its easier to read
         * @param timeout
         * @param callback
         * @returns {number}
         */
        function d(timeout, callback)
        {
            return setTimeout(callback, timeout);
        }
        
        /**
         * The animations and audio queue is played after the loading items are faded out
         */
        function beginPlayback()
        {
            $loaderPercentage.fadeOut(function() {
                $loaderDisplay.fadeOut(function() {
                    $loaderPercentage.remove();
                    $loaderDisplay.remove();
                    addIntro();
                });
            });
            // d(26000, function() {
            //     alert('next scene');
            // });
        }

        /**
         * Does the film intro
         */
        function addIntro()
        {
            d(400, function() {
                assets['intro-audio'].object.play();
            });
            
            $('#intro1').fadeIn(3000).delay(2500).fadeOut(500);
            d(6000, function() {
                $('#intro2').fadeIn(3000).delay(2500).fadeOut(500);
            });
            d(12000, function() {
                $('#intro3').fadeIn(3000).delay(2500).fadeOut(500, scene1);
            });
        }
        
        /**
         * Queues up the scene 1
         */
        function scene1()
        {
            assets['scene1-background'].object.play();
            
            var $headerText = $('#scene1-intro-text');
            
            /** begin text **/
            introText(1, 0, 'In a world', $headerText);
            introText(1400, 0, 'where timelines loom', $headerText);
            introText(3000, 300, 'hackers run wild', $headerText);
            introText(6000, 2000, 'and software bugs are just not unacceptable', $headerText);
            introText(9500, 0, 'One man', $headerText);
            
            d(12500, function() {
                $headerText.html('Only Hope').fadeIn(1000, function() {
                    $headerText.animate({
                        fontSize: "10rem",
                        opacity: 0
                    }, 5000);
                })
            });
            
            /** begin matrix slider **/
            d(10, function() {
                var $matrix = $('#scene1-matrix');
                $matrix.append($('<video />', {
                    id: 'video',
                    src: 'assets/matrix.mp4',
                    type: 'video/mp4',
                    controls: false,
                    autoplay: true
                }));
                $matrix.show().animate({
                    bottom: $(window).height() + 'px'
                }, 15000, function() {
                    $matrix.remove();
                });
            });

            /** begin audio **/
            d(100, function() {
                assets['scene1-voice'].object.play();
            });
        }

        /**
         * Helper to do the intro text block
         * @param when
         * @param delay
         * @param text
         * @param $headerText
         */
        function introText(when, delay, text, $headerText)
        {
            d(when, function() {
                $headerText.html(text).fadeIn(1000, function(){
                    $headerText.delay(delay).fadeOut(400);
                });
            })
        }
        
        return {
            init: function() {
                var preloadedCount = 0, totalCount = Object.keys(assets).length, percentComplete = 0;
                
                $.each(assets, function(name, asset) {
                    assets[name].object = new Audio();
                    assets[name].object.addEventListener('canplaythrough', function() {
                        preloadedCount += 1;
                        percentComplete = Math.round(preloadedCount / totalCount * 100);
                        $loaderDisplay.css('width', percentComplete + '%');
                        $loaderPercentage.html(percentComplete + '%');
                        if (preloadedCount == totalCount) {
                            beginPlayback();
                        }
                    }, false);
                    assets[name].object.src = asset.src;
                });
            }
        }
    };
    
    var aaron = new Website();
    aaron.init();
});
