(function($){

    $(document).ready(function(){

        var $window           = $(window),
            $body             = $("body"),
            $html             = $("html"),
            $htmlbody         = $("html, body"),
            $sliderContainer  = $('section.slider'),
            $slider           = $sliderContainer.find("ul"),
            $header           = $("header"),
            $fixedHead        = $(".fixme"),
            $headerNav        = $header.find("nav"),
            $headerNavUl      = $headerNav.find("ul"),
            $headerNavLi      = $headerNavUl.find("li"),
            $mobileToggle     = $headerNav.find(".menu-toggle"),
            $mobileLogo       = $headerNav.find(".menu-logo"),
            $scrollBtn        = $(".scroll-top"),
            $tab              = $("[data-tab]"),
            $tabIndex         = $("[data-tab-index]"),
            $contact          = $("form.contact"),
            SliderConfig      = {
                autoPlay : true,
                navigation : false,
                slideSpeed : 300,
                pagination : true,
                paginationSpeed : 400,
                singleItem: true,
                stopOnHover: true,
                addClassActive: false,
                theme: "slider-theme"
            };;

        function fixedHeader( offset )
        {

            if( offset >= ( $sliderContainer.height() + $header.height() ) )
            {
                $fixedHead.css({
                    'position' : 'fixed',
                    'top'      : '55px'
                });

                $mobileLogo.addClass("active");
            }
            if( offset < ( $sliderContainer.height() + $header.height() ) )
            {
                $fixedHead.css({
                    'position' : 'relative',
                    'top'      : 0
                });

                $mobileLogo.removeClass("active");
            }
            if( offset >= ( $header.height() - $headerNav.height() ) )
            {
                $headerNav.css({
                    'position' : 'fixed',
                    'top'      : 0
                });

                $mobileLogo.addClass("active");
            }
            if( offset < ( $header.height() - $headerNav.height() ) )
            {
                $headerNav.css({
                    'position' : 'relative'
                });

                $mobileLogo.removeClass("active");
            }

        }

        function sliderInit()
        {
            var owl = $slider.owlCarousel(SliderConfig);

            return owl;
        }

        function toggleMenu()
        {
            if( $headerNavUl.hasClass("active") )
            {
                $headerNavUl.removeClass("active").css({
                    'display' : 'none'
                });
            }
            else
            {
                $headerNavUl.addClass("active").css({
                    'display' : 'flex'
                });
            }
        }

        function scrollTopVisibility(offset)
        {

            if( offset > $sliderContainer.height())
            {
                $scrollBtn.css({
                    'opacity' : 1
                });
            }
            if( offset < $sliderContainer.height() )
            {
                $scrollBtn.css({
                    'opacity' : 0
                });
            }
        }

        function tabs( selected )
        {
            var target = $(selected).data("tab");

            $tabIndex.removeClass("active");

            $tabIndex.filter("[data-tab-index='"+target+"']").addClass("active");
        }

        function formsubmit( form )
        {
          var $this = form,
          action  = $this.attr("action"),
          method  = $this.attr("method"),
          inputs  = $this.find("input:not(:file):not(:submit) , textarea"),
          files   = $this.find("input:file"),
          content = new FormData( $this );

          //  Loop & append inputs
          for( var i = 0;  i < inputs.length ; ++i )
          {
              content.append( $(inputs[i]).attr("name") , $(inputs[i]).val() ); // Add all fields automatic
          }

          //  Loop & append files with file data
          if( files.length  ) {
              for( var i = 0;  i < files.length ; ++i )
              {
                  if(files[i].files[i] != undefined)
                  {
                      content.append(files.eq(i).attr("name"), files[i].files[i], files[i].files[i].name );// add files if exits
                  }
              }
          }
          // Submit data
          return $.ajax({
              url:  action,           //  Action  ( PHP SCRIPT )
              type: method,           //  Method
              data: content,          //  Data Created
              processData: false,     //  Tell jQuery not to process the data
              contentType: false,     //  Tell jQuery not to set contentType
              dataType: "json",       //  Accept JSON response
              cache: false           //  Disale Cashing
          });
        }

        $tab.on("click",function(){
          tabs( this );
        });

        $mobileToggle.on("click", function(){
            toggleMenu();
            $mobileToggle.toggleClass("active");
        });

        $scrollBtn.on("click", function(){
            $htmlbody.animate({
                scrollTop : 0
            },800);

            return false;
        });

        $contact.on("submit",function(){

          var flag = false,
              $contactInputs = $(this).find("input, textarea");

          $contactInputs.each(function(){
            if( $(this).val() == "" || $(this).val() == undefined ) {
              flag = true;
              $(this).addClass("error")
            }
          });

          if( flag )
          {
            setTimeout(function(){ $contactInputs.removeClass("error") }, 5000);
          }
          else
          {
            formsubmit($contact).success(function(response){

              if(response.status){ $("#response").removeClass("success error").addClass("success"); }
              else{ $("#response").removeClass("success error").addClass("error"); }

              $("#response").find("h2").html(response.title).parent().find("span").html(response.text)
            });
          }

          return false;
        });

        $window.scroll(function(){
            var offset = $(window).scrollTop();

            fixedHeader( offset );
            scrollTopVisibility(offset);
        });


        if( $body.hasClass("home") )
        {
            sliderInit();
            $.scrollIt({
                topOffset: -60,
                activeClass: 'active'
            });
        }

    });

})(jQuery)
