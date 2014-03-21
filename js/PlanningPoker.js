var overlays = {};
var cardsTitle = ['0', '1', '2', '3', '4', '5', '8', '13', '16', '20', '21', '40', '100', 'question', 'S', 'M', 'L', 'XL', 'infinity', 'coffee'];

function showOverlay(name) {
    var message = gapi.hangout.getLocalParticipant().person.displayName + ' : ' + name.substring(5);
    if (!gapi.hangout.av.hasCamera() || gapi.hangout.av.getCameraMute()) {
        gapi.hangout.layout.displayNotice(message);
        gapi.hangout.data.sendMessage(message);

    } else {
        hideAllOverlays();
        overlays[name].setVisible(true);
    }
    //showEstimateInPanel(event.message);
}

function showSection(name) {
    $("#poweroftwo").hide();
    $("#fibonacci").hide();
    $("#tshirt").hide();
    $("#" + name).show("slow");
}

function showNothing() {
    hideAllOverlays();
}

function hideAllOverlays() {
    for (var index in overlays) {
        overlays[index].setVisible(false);
    }
}

function createOverlays() {
    for (cardTitle in cardsTitle) {
        createOverlay(cardsTitle[cardTitle]);
    }
}

function createOverlay(title) {
    var cardName = title;
    var card = gapi.hangout.av.effects.createImageResource('http://dummyimage.com/80x140/000000/003cff.png&text=' + title);
    var cardOverlay = card.createOverlay({
        'scale': {'magnitude': 0.9,
            'reference': gapi.hangout.av.effects.ScaleReference.HEIGHT
        },
        'position': {
            'x': 0,
            'y': 0
        }
    });
    Object.defineProperty(overlays, cardName, {value: cardOverlay,
        writable: true,
        enumerable: true,
        configurable: true});
}

function onMessageReceived(event){
    gapi.hangout.layout.displayNotice(event.message);
    //showEstimateInPanel(event.message);
}

function showEstimateInPanel(message){
    $('#estimates').append("<li>" + message + "</li>");
}

function init() {
    gapi.hangout.onApiReady.add(function (eventObj) {
        if (eventObj.isApiReady) {
            createOverlays();
        }
    });

    gapi.hangout.data.onMessageReceived.add(onMessageReceived);
}

gadgets.util.registerOnLoadHandler(init);