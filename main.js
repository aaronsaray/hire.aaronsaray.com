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
         * Files used for the preloader script
         * @type {{files: *[]}}
         */
        var preloadFiles = {
            files: [
                [
                    {
                        "type":"AUDIO",
                        "sources": {
                            "m4a": {
                                source: "assets/intro.m4a",
                                size: 170351
                            }
                        }
                    },
                    {
                        "type":"VIDEO",
                        "sources": {
                            "h264": {
                                "source": "assets/matrix.mp4",
                                "size": 10074114
                            }
                        }
                    }
                ]
            ]
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
                $loaderDisplay.fadeOut(addIntro);
            });
            d(19000, function() {
                alert('next scene');
            });
        }

        /**
         * Queues up the intro part
         */
        function addIntro()
        {
            var $headerText = $('<div class="panel" id="top-intro-text"></div>').css('top', '5%').css('width', '100%').css('height', '4rem').hide();
            $headerText.appendTo('body');
            
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
                var $matrix = $('<div class="panel"></div>').css('bottom', '-360px').css('right', '10%').css('width', '640px');
                $matrix.append($('<video />', {
                    id: 'video',
                    src: 'assets/matrix.mp4',
                    type: 'video/mp4',
                    controls: false,
                    autoplay: true
                }));
                $matrix.appendTo('body');
                $matrix.animate({
                    bottom: $(window).height() + 'px'
                }, 15000, function() {
                    $matrix.remove();
                });
            });
            
            /** begin audio **/
            d(100, function() {
                var introAudio = new Audio('assets/intro.m4a');
                introAudio.play();
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
                $.html5Loader({
                    filesToLoad: preloadFiles,
                    onComplete: beginPlayback,
                    onUpdate: function(percentage) {
                        $loaderDisplay.css('width', percentage + '%');
                        $loaderPercentage.html(percentage + '%');
                    }
                });
            }
        }
    };
    
    var aaron = new Website();
    aaron.init();
    
});
