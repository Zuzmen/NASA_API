$(document).ready(function() {

  // Preloader
  $(window).ready(function() {
    setTimeout(function() {
      $('#loader').fadeOut('slow', function() {});
    }, 7000) // 7000000 for testing purposes);
  });

  // Url for background image
  const backgroundUrl = 'https://api.nasa.gov/planetary/apod?api_key=EanYEvMOsF2foW2GP8exIvaxkavQevOtUVVREJ63';
  // URL for gallery images
  const galleryUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=nNQQ7UdeMhgabbvaWeXrxKv7pwCyvapDGxk0uBQl';
  // welcome_screen div
  const welcomePage = $('section.welcome_page');
  // gallery section
  const gallery = $('section.gallery')

  // BACKGROUND SECTION

  // Append background to welcome_page
  function appendContent(images) {
    $.each(images, function(index, photo) {
      welcomePage.css({
        background: "#000000 url(" + photo.hdurl + ") no-repeat fixed center",
        "background-size": "cover"
      })

    })
  };

  // Get background from NASA - AJAX
  function getBackground() {
    $.ajax({url: backgroundUrl, type: "GET", dataType: "json"}).done(function(response) {
      appendContent([response]); // here is append content fn
    }).fail(function(error) {
      console.log(error);
    })
  }
  getBackground();

  // GALLERY SECTION
  // Adding image to galley

  let lastImage = 0;
  const element = gallery.find('.container');

  //InsertGalleryContents
  function appendToGallery(images) {

    $.each(images, function(index, image) {
      var galleryImg = $("<div class='img'><img src=" + image.img_src + "></div>"); // images append to gallery
      galleryImg.find('img').attr('data-camera', (image.camera).full_name);

      if (index < 6) {
        element.append(galleryImg)
        lastImage = index;
      } else {
        element.append(galleryImg);
        galleryImg.prev().hide();
      }

      // fullScreenView();
    });

  };

  // Load gallery content

  function loadContent() {
    $.ajax({url: galleryUrl, type: "GET", dataType: "json"}).done(function(response) {
      appendToGallery(response.photos);
    }).fail(function(error) {
      console.log(error);
    })
  }

  loadContent()

  // More button on click
  $('body').on('click', 'button', function(event) {
    event.preventDefault();
    let shown = 0;

    $.each(element.find('.img'), function(indexImage, image) {
      if (indexImage > lastImage && shown < 6) {
        $(image).show();
        lastImage = indexImage;
        shown++;
      }
    });

  });

});
