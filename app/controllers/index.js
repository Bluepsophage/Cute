function doClick(e) {
    //When the source element (the mouth) is clicked, the CSS class is changed, so it looks like a duckface
    $.addClass(e.source, "mouthDuckface");
    //The regular mouth class is removed
    $.removeClass(e.source, "mouth");

    //Then the camera is displayed
    Titanium.Media.showCamera({
        //If a picture is captured correctly
        success:function(event) {
            //If it is not a picture
            if(event.mediaType != Titanium.Media.MEDIA_TYPE_PHOTO) {
                alert("Got the wrong type back :"+event.mediaType);
            }
            //Finally we put the regular mouth back
            $.removeClass(e.source, "mouthDuckface");
            $.addClass(e.source, "mouth");
        },
        //If the user choose to cancel the picture
        cancel:function() {
            $.removeClass(e.source, "mouthDuckface");
            $.addClass(e.source, "mouth");
            return;
        },
        //If an error occurs
        error:function(error) {
            var a = Titanium.UI.createAlertDialog({title:'Camera'});
            //If there is no camera
            if (error.code == Titanium.Media.NO_CAMERA) {
                a.setMessage('Please run this test on device');
            }
            else {
                a.setMessage('Unexpected error : ' + error.code);
            }
            a.show();
        },
        //Save the picture in the Gallery, in a custom folder
        saveToPhotoGallery:true,
    });
}

//Will execute when the device is shaken
Titanium.Gesture.addEventListener('shake', function(e) {
    //Access element by id to change the classes
    $.addClass($.mouth, "mouthPanic");
    $.removeClass($.mouth, "mouth");

    $.addClass($.eyeLeft, "eyeLeftPanic");
    $.removeClass($.eyeLeft, "eyeLeft");

    $.addClass($.eyeRight, "eyeRightPanic");
    $.removeClass($.eyeRight, "eyeRight");

    //Wait three seconds before putting back the regular face
    setTimeout(function(){
        $.addClass($.mouth, "mouth");
        $.removeClass($.mouth, "mouthPanic");

        $.addClass($.eyeLeft, "eyeLeft");
        $.removeClass($.eyeLeft, "eyeLeftPanic");

        $.addClass($.eyeRight, "eyeRight");
        $.removeClass($.eyeRight, "eyeRightPanic");
    }, 3000);
});

$.index.open();
