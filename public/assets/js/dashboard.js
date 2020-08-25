$(document).ready(function () {
    // define the current user Id
    currentUserId = null

    // number the like counters
    for (let i = 0; i < $(".likeCount").length; i++) {
        // Get the count of likes for the current i
        let count =  $("#interested-"+(i+1)).val().split(",").length;
        // change the current counter to be displayed correctly
        $("#likeCount"+(i+1)).text(count);

    }
    // add event listenre for the button being clicked
    $(".interestedBtn").click(function (e) { 
        
        e.preventDefault(e);
        let interestedListSTR = $("#"+(this.id)).val();
        // convert the sting to an array
        
        let interestedListARRAY = interestedListSTR.split(",");
        console.log(interestedListARRAY)
        console.log("you clicked the interested buttn")
        
    });
});
