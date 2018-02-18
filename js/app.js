/*******************************************************************\
*                      Winamp2x for Javascript                     *
*                  Created by Max <hrkndr@msn.com>                 *
*    Thanks to, Nullsoft for creating such a kickass program and   *
* Jellby for the Skinner's Atlas which helped perfect this program *
\*******************************************************************/
var dir = "skindir/"

var images = new Object()
var buttons = new Object()
var mode = "nofile"
var buttonPressed = false
var seekingMode = false
var zoom = 1
var shuffleOn = false
var repeatOn = false
var playlistOn = false
var equalizerOn = false
var whipLlama = false
var scrollPos = 0
var baseMsg = ""
var scrollTimer = ""
var audioTimer = ""
var firstLetter = 0
var displayStop = false
var songDuration = 0
var shaded = false
var endPixel = ""
var elapsedDisplay = false
var extendedNumbers = false
document.onRelease = new Function("")
document.title = "Javascript Winamp"
var title = "";
var letters = new Object()
var output = ""
var offset = 5
var letterList = new Array(new Array(97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118,
    119, 120, 121, 122, null, null, null, null, 32), new Array(48, 49, 50, 51, 52, 53, 54, 55, 56, 57, null, null, 58, 40, 41, 45, 39, 33, 95, 43, 92, 47, 91,
    93, 94, 38, 37, 46, 61, 36, 35), new Array(229, 246, 228, 63, 42), new Array(34, 121, 100, 84, 55, 38, 24, 74, 68, 100, 76, 61, 49, 81, 29, 126, 118,
    89, 78, 51, 39, 18, 4, 120, 7, 17, 84, 72, 47, 18, 8, 109, 83, 115, 87, 82, 114, 65, 36, 30, 62, 122, 100, 88, 69, 53, 27, 15, 79, 62, 51, 35, 81, 54, 39, 22, 84))
for (var ea = 0; ea <= 2; ea++) {
    for (var eb = 0; eb <= letterList[ea].length - 1; eb++) {
        if (letterList[ea][eb]) {
            letters[letterList[ea][eb]] = new Object();
            letters[letterList[ea][eb]].x = eb * 5;
            letters[letterList[ea][eb]].y = ea * 6
        }
    }
}
var credOut = ""

function setUp() {
    var imageList = new Array("BALANCE", "CBUTTONS", "MB", "MONOSTER", "NUMBERS", "NUMS_EX", "PLAYPAUS", "PLEDIT", "POSBAR", "SHUFREP", "TEXT", "TITLEBAR", "VOLUME")
    for (var sua = 0; sua <= imageList.length - 1; sua++) {
        images[imageList[sua]] = new Image()
        images[imageList[sua]].src = dir + imageList[sua] + ".BMP"
    }
    if (images.NUMS_EX.readyState == "complete") {
        extendedNumbers = true
    }
    mainbg.src = dir + "MAIN.BMP"
    mainbg.onmousedown = new Function("setupPlayerDrag()")
    var buttonList = new Array("previous", "play", "pause", "stop", "next")
    for (var sub = 0; sub <= 4; sub++) {
        changeImage(buttonList[sub], sub * 23, 0, 18, 22, 16 + (sub * 23), 88, "CBUTTONS.BMP")
        document.all[buttonList[sub]].onmouseup = new Function('if (buttonPressed) {changeImage("' + buttonList[sub] + '",' + (sub * 23) + ',0,18,22,' + (16 + (sub * 23)) + ',88);buttonPressed = false;command("' + buttonList[sub] + '")}')
        document.all[buttonList[sub]].onmousedown = new Function('changeImage("' + buttonList[sub] + '",' + (sub * 23) + ',18,18,22,' + (16 + (sub * 23)) + ',88);buttonPressed = true;document.onRelease = new Function("buttonPressed = false")')
        document.all[buttonList[sub]].onmouseout = new Function('if (buttonPressed) {changeImage("' + buttonList[sub] + '",' + (sub * 23) + ',0,18,22,' + (16 + (sub * 23)) + ',88)}')
        document.all[buttonList[sub]].onmouseover = new Function('if (buttonPressed) {changeImage("' + buttonList[sub] + '",' + (sub * 23) + ',18,18,22,' + (16 + (sub * 23)) + ',88)}')
    }
    changeImage("eject", 114, 0, 16, 22, 136, 89, "CBUTTONS.BMP")
    eject.onmouseup = new Function('if (buttonPressed) {changeImage("eject",114,0,16,22,136,89);command("eject")}')
    eject.onmousedown = new Function('changeImage("eject",114,16,16,22,136,89);buttonPressed = true;document.onRelease = new Function("buttonPressed = false")')
    eject.onmouseout = new Function('if (buttonPressed) {changeImage("eject",114,0,16,22,136,89)}')
    eject.onmouseover = new Function('if (buttonPressed) {changeImage("eject",114,16,16,22,136,89)}')
    changeImage("seeker", 248, 0, 10, 29, 0, 0, "POSBAR.BMP")
    seeker.onmousedown = new Function('changeImage("seeker",278,0,10,29,seeker.scanLeft-278,0);setupSeeker()')
    changeImage("posbar", 0, 0, 10, 247, 0, 0, "POSBAR.BMP")
    posbar.onmousedown = new Function('changeImage("seeker",278,0,10,29,mousePosX()-(parseInt(player.style.left)/zoom)-312,0);setupSeeker()')
    changeImage("equalizerToggle", 0, ((equalizerOn) ? 73 : 61), 12, 23, 219, 58, "SHUFREP.BMP")
    equalizerToggle.onmousedown = new Function('changeImage("equalizerToggle",46,((equalizerOn)? 73:61),12,23,219,58);document.onRelease = new Function("buttonPressed = false");buttonPressed = true')
    equalizerToggle.onmouseup = new Function('if (buttonPressed) {equalizerOn = !equalizerOn;buttonPressed = false;changeImage("equalizerToggle",0,((equalizerOn)? 73:61),12,23,219,58)}')
    equalizerToggle.onmouseout = new Function('if (buttonPressed) {changeImage("equalizerToggle",0,((equalizerOn)? 73:61),12,23,219,58)}')
    equalizerToggle.onmouseover = new Function('if (buttonPressed) {changeImage("equalizerToggle",46,((equalizerOn)? 73:61),12,23,219,58)}')
    changeImage("repeatToggle", 0, ((repeatOn) ? 30 : 0), 15, 28, 210, 89, "SHUFREP.BMP")
    repeatToggle.onmousedown = new Function('changeImage("repeatToggle",0,((repeatOn)? 45:15),15,28,210,89);document.onRelease = new Function("buttonPressed = false");buttonPressed = true')
    repeatToggle.onmouseup = new Function('if (buttonPressed) {repeatOn = !repeatOn;buttonPressed = false;changeImage("repeatToggle",0,((repeatOn)? 30:0),15,28,210,89)}')
    repeatToggle.onmouseout = new Function('if (buttonPressed) {changeImage("repeatToggle",0,((repeatOn)? 30:0),15,28,210,89)}')
    repeatToggle.onmouseover = new Function('if (buttonPressed) {changeImage("repeatToggle",0,((repeatOn)? 45:15),15,28,210,89)}')
    changeImage("shuffleToggle", 28, ((shuffleOn) ? 30 : 0), 15, 47, 164, 89, "SHUFREP.BMP")
    shuffleToggle.onmousedown = new Function('changeImage("shuffleToggle",28,((shuffleOn)? 45:15),15,47,164,89);document.onRelease = new Function("buttonPressed = false");buttonPressed = true')
    shuffleToggle.onmouseup = new Function('if (buttonPressed) {shuffleOn = !shuffleOn;buttonPressed = false;changeImage("shuffleToggle",28,((shuffleOn)? 30:0),15,47,164,89)}')
    shuffleToggle.onmouseout = new Function('if (buttonPressed) {changeImage("shuffleToggle",28,((shuffleOn)? 30:0),15,47,164,89)}')
    shuffleToggle.onmouseover = new Function('if (buttonPressed) {changeImage("shuffleToggle",28,((shuffleOn)? 45:15),15,47,164,89)}')
    changeImage("playlistToggle", 23, ((playlistOn) ? 73 : 61), 12, 23, 242, 58, "SHUFREP.BMP")
    playlistToggle.onmousedown = new Function('changeImage("playlistToggle",69,((playlistOn)? 73:61),12,23,242,58);document.onRelease = new Function("buttonPressed = false");buttonPressed = true')
    playlistToggle.onmouseup = new Function('if (buttonPressed) {playlistOn = !playlistOn;buttonPressed = false;changeImage("playlistToggle",23,((playlistOn)? 73:61),12,23,242,58)}')
    playlistToggle.onmouseout = new Function('if (buttonPressed) {changeImage("playlistToggle",23,((playlistOn)? 73:61),12,23,242,58)}')
    playlistToggle.onmouseover = new Function('if (buttonPressed) {changeImage("playlistToggle",69,((playlistOn)? 73:61),12,23,242,58)}')
    var buttonList = new Array("o", "a", "i", "d", "v")
    var buttonmsg = new Array("options menu (disabled)", "enable always-on-top (disabled)", "file info box (disabled)", null, "visualization menu (disabled)")
    for (var sud = 0; sud <= 4; sud++) {
        if (sud != 3) {
            changeImage(buttonList[sud] + "Button", 305, 2 + (8 * sud), 9, 7, 11, 24 + (8 * sud), "TITLEBAR.BMP")
            document.all[buttonList[sud] + "Button"].onmousedown = new Function('changeImage("' + buttonList[sud] + 'Button",' + (305 + (8 * sud)) + ',' + (46 + (8 * sud)) + ',9,7,11,' + (24 + (8 * sud)) + ');buttonPressed = true;document.onRelease = new Function("buttonPressed = false");showMsg("' + buttonmsg[sud] + '")')
            document.all[buttonList[sud] + "Button"].onmouseup = new Function('if (buttonPressed) {changeImage("' + buttonList[sud] + 'Button",305,' + (2 + (8 * sud)) + ',9,7,11,' + (24 + (8 * sud)) + ');buttonPressed = false;restoreText()}')
            document.all[buttonList[sud] + "Button"].onmouseover = new Function('if (buttonPressed) {changeImage("' + buttonList[sud] + 'Button",' + (305 + (8 * sud)) + ',' + (46 + (8 * sud)) + ',9,7,11,' + (24 + (8 * sud)) + ');showMsg("' + buttonmsg[sud] + '")}')
            document.all[buttonList[sud] + "Button"].onmouseout = new Function('if (buttonPressed) {changeImage("' + buttonList[sud] + 'Button",305,' + (2 + (8 * sud)) + ',9,7,11,' + (24 + (8 * sud)) + ');restoreText()}')
        }
    }
    changeImage("dButton", ((zoom == 2) ? 329 : 305), ((zoom == 2) ? 70 : 26), 9, 7, 11, 48, "TITLEBAR.BMP")
    dButton.onmousedown = new Function('changeImage("dButton",329,70,9,7,11,48);buttonPressed = true;document.onRelease = new Function("buttonPressed = false");showMsg(((zoom == 2)? "disable":"enable")+" doublesize mode")')
    dButton.onmouseup = new Function('if (buttonPressed) {zoom = ((zoom == 2)? 1:2);changeImage("dButton",((zoom == 2)? 329:305),((zoom == 2)? 70:26),9,7,11,48);buttonPressed = false;player.style.zoom = zoom+"00%";restoreText()}')
    dButton.onmouseover = new Function('if (buttonPressed) {changeImage("dButton",329,70,9,7,11,48);showMsg(((zoom == 2)? "disable":"enable")+" doublesize mode")}')
    dButton.onmouseout = new Function('if (buttonPressed) {changeImage("dButton",((zoom == 2)? 329:305),((zoom == 2)? 70:26),9,7,11,48);restoreText()}')
    var textOutput = ""
    for (var sue = 0; sue <= 30; sue++) {
        textOutput += "<img id=\"staticmsgLetter_" + sue + "\" class=\"custom-draw level1\">"
    }
    staticmsg.innerHTML = textOutput;
    textOutput = "";
    for (var sue = 0; sue <= 30; sue++) {
        changeImage("staticmsgLetter_" + sue, 0, 0, 0, 0, sue * 5, 0, "TEXT.BMP")
        textOutput += "<img id=\"staticbaseLetter_" + sue + "\" class=\"custom-draw level1\">"
    }
    staticbase.innerHTML = textOutput;
    textOutput = "";
    endPixel = letterList[3];
    credits()
    for (var sue = 0; sue <= 30; sue++) {
        changeImage("staticbaseLetter_" + sue, 0, 0, 0, 0, sue * 5, 0, "TEXT.BMP")
    }
    changeImage("titlebarplayer", 27, 0, 13, 275, 0, 0, "TITLEBAR.BMP")
    if (credOut.length != 56) {
        player.style.display = "none"
    } else {
        credOut = ""
    }
    titlebarplayer.onmousedown = new Function("setupPlayerDrag()")
    changeImage("sysmenuplayer", 0, 0, 9, 9, 6, 3, "TITLEBAR.BMP")
    sysmenuplayer.onmousedown = new Function('changeImage("sysmenuplayer",0,9,9,9,6,3);document.onRelease = new Function("buttonPressed = false");buttonPressed = true')
    sysmenuplayer.onmouseup = new Function('if (buttonPressed) {buttonPressed = false;changeImage("sysmenuplayer",0,0,9,9,6,3)}')
    sysmenuplayer.onmouseout = new Function('if (buttonPressed) {changeImage("sysmenuplayer",0,0,9,9,6,3)}')
    sysmenuplayer.onmouseover = new Function('if (buttonPressed) {changeImage("sysmenuplayer",0,9,9,9,6,3)}')
    changeImage("minimizeplayer", 9, 0, 9, 9, 244, 3, "TITLEBAR.BMP")
    minimizeplayer.onmousedown = new Function('changeImage("minimizeplayer",9,9,9,9,244,3);document.onRelease = new Function("buttonPressed = false");buttonPressed = true')
    minimizeplayer.onmouseup = new Function('if (buttonPressed) {buttonPressed = false;changeImage("minimizeplayer",9,0,9,9,244,3)}')
    minimizeplayer.onmouseout = new Function('if (buttonPressed) {changeImage("minimizeplayer",9,0,9,9,244,3)}')
    minimizeplayer.onmouseover = new Function('if (buttonPressed) {changeImage("minimizeplayer",9,9,9,9,244,3)}')
    changeImage("closeplayer", 18, 0, 9, 9, 264, 3, "TITLEBAR.BMP")
    closeplayer.onmousedown = new Function('changeImage("closeplayer",18,9,9,9,264,3);document.onRelease = new Function("buttonPressed = false");buttonPressed = true')
    closeplayer.onmouseup = new Function('if (buttonPressed) {buttonPressed = false;changeImage("closeplayer",18,0,9,9,264,3)}')
    closeplayer.onmouseout = new Function('if (buttonPressed) {changeImage("closeplayer",18,0,9,9,264,3)}')
    closeplayer.onmouseover = new Function('if (buttonPressed) {changeImage("closeplayer",18,9,9,9,264,3)}')
    changeImage("shadeplayer", 0, ((shaded) ? 27 : 18), 9, 9, 254, 3, "TITLEBAR.BMP")
    shadeplayer.onmousedown = new Function('changeImage("shadeplayer",9,((shaded)? 27:18),9,9,254,3);document.onRelease = new Function("buttonPressed = false");buttonPressed = true')
    shadeplayer.onmouseup = new Function('if (buttonPressed) {buttonPressed = false;changeImage("shadeplayer",0,((shaded)? 27:18),9,9,254,3);windowShade(shaded)}')
    shadeplayer.onmouseout = new Function('if (buttonPressed) {changeImage("shadeplayer",0,((shaded)? 27:18),9,9,254,3)}')
    shadeplayer.onmouseover = new Function('if (buttonPressed) {changeImage("shadeplayer",9,((shaded)? 27:18),9,9,254,3)}')


    changeImage("volumeslider", 15, 422, 11, 14, 51, 1, "VOLUME.BMP")
    volumeslider.onmousedown = new Function('changeImage("volumeslider",0,422,11,14,volumeslider.scanLeft,1);setupVolume()')
    changeImage("volumeback", 0, 405, 13, 68, 0, 0, "VOLUME.BMP")
    volumeback.onmousedown = new Function('changeImage("volumeslider",0,422,11,14,mousePosX()-(parseInt(player.style.left)/zoom)-116,1);setupVolume()')
    changeImage("balanceslider", 15, 422, 11, 14, 12, 1, "BALANCE.BMP")
    balanceslider.onmousedown = new Function('changeImage("balanceslider",0,422,11,14,balanceslider.scanLeft,1);setupBalance()')
    changeImage("balanceback", 9, 0, 13, 38, 0, 0, "BALANCE.BMP")
    balanceback.onmousedown = new Function('changeImage("balanceslider",0,422,11,14,mousePosX()-(parseInt(player.style.left)/zoom)-185,1);setupBalance()')
    changeImage("backshaded", 195, 31, 10, 8, 168, 2, "TITLEBAR.BMP");
    backshaded.onmousedown = new Function('command("back")')
    changeImage("playshaded", 203, 31, 10, 10, 176, 2, "TITLEBAR.BMP");
    playshaded.onmousedown = new Function('command("play")')
    changeImage("pauseshaded", 213, 31, 10, 9, 186, 2, "TITLEBAR.BMP");
    pauseshaded.onmousedown = new Function('command("pause")')
    changeImage("stopshaded", 222, 31, 10, 9, 195, 2, "TITLEBAR.BMP");
    stopshaded.onmousedown = new Function('command("stop")')
    changeImage("nextshaded", 231, 31, 10, 11, 204, 2, "TITLEBAR.BMP");
    nextshaded.onmousedown = new Function('command("next")')
    changeImage("ejectshaded", 242, 31, 10, 10, 215, 2, "TITLEBAR.BMP");
    ejectshaded.onmousedown = new Function('command("eject")')
    changeImage("creditsbutton", 253, 91, 15, 13, 253, 91, "MAIN.BMP")
    creditsbutton.onmousedown = new Function('document.onRelease = new Function("buttonPressed = false");buttonPressed = true')
    creditsbutton.onmouseup = new Function('if (buttonPressed) {buttonPressed = false;credits();newTime = convertTime(0)}')
    changeImage("posbarshaded", 0, 36, 7, 17, 0, 0, "TITLEBAR.BMP")
    posbarshaded.onmousedown = new Function('var newPos = mousePosX()-(parseInt(player.style.left)/zoom)-229;changeImage("seekershaded",((newPos <= 5)? 17:((newPos <= 9)? 20:23)),36,7,3,newPos,0);setupSeekershaded()')
    changeImage("seekershaded", 0, 0, 0, 0, 0, 0, "TITLEBAR.BMP")
    seekershaded.onmousedown = setupSeekershaded
    changeImage("audiodetail", 18, 0, 9, 9, 26, 28, "PLAYPAUS.BMP")
    changeImage("audiodetail2", 18, 0, 0, 0, 0, 0, "PLAYPAUS.BMP")
    changeImage("numberpre", 0, 0, 0, 0, 0, 0, ((extendedNumbers) ? "NUMS_EX.BMP" : "NUMBERS.BMP"))
    changeImage("numbermin1", 0, 0, 0, 0, 10, 0, "NUMBERS.BMP")
    changeImage("numbermin2", 0, 0, 0, 0, 22, 0, "NUMBERS.BMP")
    changeImage("numbersec1", 0, 0, 0, 0, 40, 0, "NUMBERS.BMP")
    changeImage("numbersec2", 0, 0, 0, 0, 52, 0, "NUMBERS.BMP")
    changeImage("shadedLetter_0", 0, 0, 0, 0, 0, 0, "TEXT.BMP")
    changeImage("shadedLetter_1", 0, 0, 0, 0, 5, 0, "TEXT.BMP")
    changeImage("shadedLetter_2", 0, 0, 0, 0, 10, 0, "TEXT.BMP")
    changeImage("shadedLetter_4", 0, 0, 0, 0, 20, 0, "TEXT.BMP")
    changeImage("shadedLetter_5", 0, 0, 0, 0, 25, 0, "TEXT.BMP")
    changeImage("stereochange", 0, 12, 12, 29, 238, 41, "MONOSTER.BMP")
    changeImage("monochange", 29, 12, 12, 29, 212, 41, "MONOSTER.BMP")
    showMsg("javascript winamp", true)
    detailImage();
    //updateAudio()

    player.classList.remove('hide');
    player.style = "left:0;top:0;";

    var audio = getPlayer();
    var filegrabber = getFileGrabber();
    filegrabber.addEventListener('change', function(e) {
        var input = e.target;
        var reader = new FileReader();

        if (input && input.files) {
            var file = input.files[0];
            title = convertFile(file.name);

            var reader = new FileReader();
            reader.onload = function (e) {
                audio.src = e.target.result;
                setMode('stop');
                command("play");
                // reset file upload
                document.getElementById('filegrabreset').click();
            }
            reader.readAsDataURL(file);
        }
    });

    audio.addEventListener('durationchange', function(e) {
      songDuration = audio.duration;
      document.title = title
      updateTitleStr()
    });

    audio.addEventListener('timeupdate', function(e) {
      updateAudio()
    })
}

function updateTitleStr() {
    var playTitle = title.toLowerCase() + " (" + convertTime(songDuration, true) + ")"
    showMsg(playTitle + ((playTitle.length > 30) ? "  ***  " : ""), true)
}

function windowShade(returnLarge) {
    if (returnLarge) {
        largesection.classList.remove('hide');
        smallsection.classList.add('hide');
        shaded = false
        changeImage("titlebarplayer", 27, 0, 13, 275, 0, 0);
        changeImage("shadeplayer", 0, 18, 9, 9, 254, 3)
        //updateAudio()
    } else {
        largesection.classList.add('hide');
        smallsection.classList.remove('hide');
        shaded = true
        changeImage("titlebarplayer", 27, 29, 14, 275, 0, 0);
        changeImage("shadeplayer", 0, 27, 9, 9, 254, 3)
        //updateAudio()
    }
}

function mousePosX() {
    return ((event.x - document.body.scrollLeft) / zoom)
}

function mousePosY() {
    return ((event.y - document.body.scrollTop) / zoom)
}

function changeImage(imageid, clipX, clipY, clipH, clipW, posX, posY, imagesrc) {
    if (imagesrc) {
        document.all[imageid].src = dir + imagesrc
    }
    document.all[imageid].style.clip = "rect(" + clipY + "px " + (clipX + clipW) + "px " + (clipY + clipH) + "px " + clipX + "px)"
    document.all[imageid].style.left = posX - clipX;
    document.all[imageid].style.top = posY - clipY
    document.all[imageid].scanLeft = posX
}

function showMsg(msg, isBase) {
    var writeTo = "staticmsgLetter_";
    clearInterval(scrollTimer)
    if (isBase) {
        writeTo = "staticbaseLetter_";
        forwardText(true);
        baseMsg = msg;
        firstLetter = 0;
        scrollPos = 0
        if (baseMsg.length > 30) {
            scrollTimer = setTimeout("scrollText()", 1500)
        }
    } else {
        forwardText();
        clearTimeout(scrollTimer)
    }
    for (var ssc = 0; ssc <= 30; ssc++) {
        if (ssc <= msg.length - 1) {
            var loc = letters[msg.charCodeAt(ssc)]
            if (loc) {
                document.all[writeTo + ssc].style.clip = "rect(" + loc.y + "px " + (loc.x + 5) + "px " + (loc.y + 6) + "px " + loc.x + "px)"
                document.all[writeTo + ssc].style.left = (ssc * 5) - loc.x;
                document.all[writeTo + ssc].style.top = -loc.y
            } else {
                document.all[writeTo + ssc].style.clip = "rect(0px 155px 6px 150px)"
                document.all[writeTo + ssc].style.left = (ssc * 5) - 150;
                document.all[writeTo + ssc].style.top = 0
            }
        } else {
            document.all[writeTo + ssc].style.clip = "rect(0px 0px 0px 0px)"
        }
    }
}

function scrollText() {
    scrollPos++;
    if (scrollPos > baseMsg.length - 1) {
        scrollPos = 0
    }
    var writeLetter = scrollPos + 30;
    while (writeLetter > baseMsg.length - 1) {
        writeLetter = writeLetter - baseMsg.length
    }
    for (var sta = 0; sta <= 30; sta++) {
        if (sta == firstLetter) {
            var loc = letters[baseMsg.charCodeAt(writeLetter)];
            if (!loc) {
                loc = letters[32]
            }
            document.all["staticbaseLetter_" + sta].style.clip = "rect(" + loc.y + "px " + (loc.x + 5) + "px " + (loc.y + 6) + "px " + loc.x + "px)"
            document.all["staticbaseLetter_" + sta].style.left = 150 - loc.x;
            document.all["staticbaseLetter_" + sta].style.top = -loc.y
        } else {
            document.all["staticbaseLetter_" + sta].style.left = parseInt(document.all["staticbaseLetter_" + sta].style.left) - 5
        }
    }
    firstLetter++;
    if (firstLetter > 30) {
        firstLetter = 0
    }
    scrollTimer = setTimeout("scrollText()", 200)
}

function credits() {
    var offset = endPixel[0];
    credOut = ""
    for (var y = 1; y <= endPixel.length - 1; y++) {
        var current = endPixel[y] - offset
        while (current <= 0) {
            current = current + 126
        }
        offset = offset + current
        credOut += String.fromCharCode(current)
    }
}

function playerPos() {
    var playerobj = getPlayer();
    return ((playerobj.currentTime > 0) ? playerobj.currentTime : 0)
}

function showMinus() {
    if (!shaded) {

    }
}

function updateAudio() {
    if(isNaN(songDuration)) {
        songDuration = getPlayer().duration;
        updateTitleStr()
    }
    if (mode == "stop" || mode == "nofile") {
        if (shaded) {
            for (var uaf = 0; uaf <= 5; uaf++) {
                if (uaf != 3) {
                    changeImage("shadedLetter_" + uaf, 150, 0, 6, 5, (uaf * 5) + ((uaf < 3) ? 2 : 0), 0)
                }
            }
        } else {
            numberpre.style.clip = "rect(0px 0px 0px 0px)"
            changeImage("numbermin1", 90, 0, 13, 9, 10, 0);
            changeImage("numbermin2", 90, 0, 13, 9, 22, 0)
            changeImage("numbersec1", 90, 0, 13, 9, 40, 0);
            changeImage("numbersec2", 90, 0, 13, 9, 52, 0)
        }
    } else {
        var audioPos = convertTime((elapsedDisplay) ? -songDuration + playerPos() : playerPos())
        if (audioPos.length == 5) {
            audioPos = ":" + audioPos
        }
        if (playerobj.PlayState == 0) {
            command("stop")
        } else {
            if (mode == "play" || mode == "pause") {
                if (mode == "pause") {
                    var time = new Date().getSeconds();
                    time = (Math.floor(time / 2) / 2 == Math.floor(Math.round(time / 2) / 2)) ? true : false
                }
                if (!time || mode == "play") {
                    if (shaded) {
                        if (!seekingMode) {
                            for (var uaa = 0; uaa <= 5; uaa++) {
                                var loc = audioPos.charCodeAt(uaa)
                                if (loc != 58) {
                                    loc = letters[loc];
                                    changeImage("shadedLetter_" + uaa, loc.x, loc.y, 6, 5, (uaa * 5) + ((uaa < 3) ? 2 : 0), 0)
                                } else if (uaa != 3) {
                                    document.all["shadedLetter_" + uaa].style.clip = "rect(0px 0px 0px 0px)"
                                }
                            }
                        }
                    } else {
                        if (audioPos.charAt(0) == "-") {
                            if (extendedNumbers) {
                                changeImage("numberpre", 99, 0, 13, 9, -2, 0)
                            } else {
                                changeImage("numberpre", 18, 6, 1, 6, -1, 6)
                            }
                        } else {
                            numberpre.style.clip = "rect(0px 0px 0px 0px)"
                        }
                        changeImage("numbermin1", audioPos.charAt(1) * 9, 0, 13, 9, 10, 0);
                        changeImage("numbermin2", audioPos.charAt(2) * 9, 0, 13, 9, 22, 0)
                        changeImage("numbersec1", audioPos.charAt(4) * 9, 0, 13, 9, 40, 0);
                        changeImage("numbersec2", audioPos.charAt(5) * 9, 0, 13, 9, 52, 0)
                    }
                } else {
                    if (shaded) {
                        for (var uaf = 0; uaf <= 5; uaf++) {
                            if (uaf != 3) {
                                changeImage("shadedLetter_" + uaf, 150, 0, 6, 5, (uaf * 5) + ((uaf < 3) ? 2 : 0), 0)
                            }
                        }
                    } else {
                        numberpre.style.clip = "rect(0px 0px 0px 0px)"
                        changeImage("numbermin1", 90, 0, 13, 9, 10, 0);
                        changeImage("numbermin2", 90, 0, 13, 9, 22, 0)
                        changeImage("numbersec1", 90, 0, 13, 9, 40, 0);
                        changeImage("numbersec2", 90, 0, 13, 9, 52, 0)
                    }
                }
            } else {
                if (shaded) {
                    for (var uaf = 0; uaf <= 5; uaf++) {
                        if (uaf != 3) {
                            changeImage("shadedLetter_" + uaf, 150, 0, 6, 5, (uaf * 5) + ((uaf < 3) ? 2 : 0), 0)
                        }
                    }
                } else {
                    numberpre.style.clip = "rect(0px 0px 0px 0px)"
                    changeImage("numbermin1", 90, 0, 13, 9, 10, 0);
                    changeImage("numbermin2", 90, 0, 13, 9, 22, 0)
                    changeImage("numbersec1", 90, 0, 13, 9, 40, 0);
                    changeImage("numbersec2", 90, 0, 13, 9, 52, 0)
                }
            }
            if (!seekingMode) {
                if (mode == "play" || mode == "pause") {
                    if (shaded) {
                        var seekPos = Math.round(playerPos());
                        if (seekPos != 0) {
                            seekPos = 11 / (songDuration / seekPos)
                        }
                        changeImage("seekershaded", ((seekPos <= 4) ? 17 : ((seekPos <= 7) ? 20 : 23)), 36, 7, 3, seekPos + 1, 0)
                    } else {
                        var seekPos = (219 / (songDuration / Math.round(playerPos()))) - 248;
                        seeker.style.left = seekPos;
                        seeker.scanLeft = seekPos + 248
                    }
                }
            }
        }
    }
}

function forwardText(isBase) {
    if (isBase) {
        staticmsg.classList.add('hide');
        staticbase.classList.remove('hide');
    } else {
        staticmsg.classList.remove('hide');
        staticbase.classList.add('hide');
    }
}

function setupSeeker() {
    seekingMode = true;
    showMsg("seek to:   :  /  :   (");
    updateSeeker(seeker.scanLeft)
    document.onmousemove = new Function("updateSeeker(mousePosX()-(" + (mousePosX() - seeker.scanLeft) + "))")
    document.onRelease = new Function("changeImage('seeker',248,0,10,29,seeker.scanLeft+278,0);playerobj.duration = (seeker.scanLeft/220)*songDuration;document.onmousemove = new Function(\'\');updateAudio();seekingMode = false;restoreText()")
}

function setupVolume() {
    showMsg("volume: ");
    updateVolume(volumeslider.scanLeft)
    document.onmousemove = new Function("updateVolume(mousePosX()-(" + (mousePosX() - volumeslider.scanLeft) + "))")
    document.onRelease = new Function("changeImage('volumeslider',15,422,11,14,volumeslider.scanLeft,1);document.onmousemove = new Function('');restoreText()")
}

function setupBalance() {
    showMsg("balance: ");
    updateBalance(balanceslider.scanLeft)
    document.onmousemove = new Function("updateBalance(mousePosX()-(" + (mousePosX() - balanceslider.scanLeft) + "))")
    document.onRelease = new Function("changeImage('balanceslider',15,422,11,14,balanceslider.scanLeft,1);document.onmousemove = new Function('');restoreText()")
}

function setupPlayerDrag() {
    document.onmousemove = new Function("player.style.left = ((mousePosX()*zoom)-(" + ((mousePosX() * zoom) - parseInt(player.style.left)) + "));player.style.top = ((mousePosY()*zoom)-(" + ((mousePosY() * zoom) - parseInt(player.style.top)) + "))")
    document.onRelease = new Function("document.onmousemove = new Function('');seekingMode = false")
}

function setupSeekershaded() {
    seekingMode = true
    document.onmousemove = new Function("updateSeekershaded(mousePosX()-(" + (mousePosX() - seekershaded.scanLeft) + "))")
    document.onRelease = new Function("playerobj.duration = ((seekershaded.scanLeft-1)/12)*songDuration;document.onmousemove = new Function('');seekingMode = false")
}

function restoreText() {
    forwardText(true);
    if (baseMsg.length > 30) {
        scrollTimer = setTimeout("scrollText()", 1500)
    }
}

function convertTime(input, simpleOut) {
    if (input >= 5940) {
        return ("99:00")
    } else if (input <= -5940) {
        return ("-99:00")
    } else {
        var min = (input < 0) ? Math.floor(-input / 60) * -1 : Math.floor(input / 60)
        var sec = Math.abs(Math.round(input - (min * 60)));
        if (sec == 60) {
            sec = 00;
            min = (input < 0) ? min - 1 : min + 1
        }
        min = Math.abs(min) + "";
        sec += "";
        if (credOut != "") {
            alert(credOut);
            credOut = ""
        }
        if (!simpleOut && min.length == 1) {
            min = "0" + min
        };
        if (sec.length == 1) {
            sec = "0" + sec
        }
        return (((input < 0) ? "-" : "") + min + ":" + sec)
    }
}

function updateSeeker(seekerChange) {
    if (!displayStop) {
        displayStop = true;
        setTimeout("displayStop = false")
        var seekPos = (seekerChange > -278) ? ((seekerChange < -59) ? seekerChange : -59) : -278
        seeker.style.left = seekPos;
        seeker.scanLeft = seekPos
        var per = Math.round(100 * ((seekPos - 278) / 220)) + 253
        var changePhrase = ":::::::::" + convertTime(songDuration / (100 / per)) + ":" + convertTime(songDuration) + "::" + per + "%)"

        var audio = getPlayer();
        audio.currentTime = (songDuration / (100 / per));

        for (var usa = 9; usa <= 26; usa++) {
            if (changePhrase.length <= usa) {
                document.all["staticmsgLetter_" + usa].style.clip = "rect(0px 0px 0px 0px)"
            } else {
                var loc = changePhrase.charCodeAt(usa)
                if (loc != 58) {
                    loc = letters[loc]
                    document.all["staticmsgLetter_" + usa].style.clip = "rect(" + loc.y + "px " + (loc.x + 5) + "px " + (loc.y + 6) + "px " + loc.x + "px)"
                    document.all["staticmsgLetter_" + usa].style.left = ((usa) * 5) - loc.x;
                    document.all["staticmsgLetter_" + usa].style.top = -loc.y
                }
            }
        }
    }
}

function updateVolume(volumeChange) {
    if (!displayStop) {
        displayStop = true;
        setTimeout("displayStop = false")
        if (volumeChange < 0) {
            volumeChange = 0
        };
        if (volumeChange > 51) {
            volumeChange = 51
        }
        changeImage("volumeback", 0, Math.round(27 / (51 / volumeChange)) * 15, 13, 68, 0, 0)
        volumeslider.style.left = volumeChange;
        volumeslider.scanLeft = volumeChange

        var desiredVolume = (100 / (51 / volumeChange));

        playerobj.volume = desiredVolume/100; // decimal fraction volume...

        var changePhrase = "::::::::" + Math.round(100 / (51 / volumeChange)) + "%"
        for (var uva = 8; uva <= 14; uva++) {
            if (changePhrase.length <= uva) {
                document.all["staticmsgLetter_" + uva].style.clip = "rect(0px 0px 0px 0px)"
            } else {
                var loc = letters[changePhrase.charCodeAt(uva)]
                document.all["staticmsgLetter_" + uva].style.clip = "rect(" + loc.y + "px " + (loc.x + 5) + "px " + (loc.y + 6) + "px " + loc.x + "px)"
                document.all["staticmsgLetter_" + uva].style.left = ((uva) * 5) - loc.x;
                document.all["staticmsgLetter_" + uva].style.top = -loc.y
            }
        }
    }
}

function updateBalance(balanceChange) {
    return;
    if (!displayStop) {
        displayStop = true;
        setTimeout("displayStop = false")
        if (balanceChange < 0) {
            balanceChange = 0
        } else if (balanceChange > 24) {
            balanceChange = 24
        }
        if (balanceChange > 9 && balanceChange < 16) {
            balanceChange = 12
        }
        playerobj.Balance = (balanceChange <= 0) ? -10000 : ((balanceChange >= 24) ? 10000 : (1500 / (12 / (balanceChange - 12))))
        balanceslider.style.left = balanceChange;
        balanceslider.scanLeft = balanceChange;
        balanceChange = balanceChange - 12
        changeImage("balanceback", 9, Math.abs(Math.round(27 / (12 / balanceChange))) * 15, 13, 38, 0, 0)
        var changePhrase = ":::::::::"
        if (balanceChange < 0) {
            changePhrase += Math.round(100 / (-12 / balanceChange)) + "% left"
        } else if (balanceChange > 0) {
            changePhrase += Math.round(100 / (12 / balanceChange)) + "% right"
        } else {
            changePhrase += "center"
        }
        for (var uba = 9; uba <= 18; uba++) {
            if (changePhrase.length <= uba) {
                document.all["staticmsgLetter_" + uba].style.clip = "rect(0px 0px 0px 0px)"
            } else {
                var loc = letters[changePhrase.charCodeAt(uba)]
                document.all["staticmsgLetter_" + uba].style.clip = "rect(" + loc.y + "px " + (loc.x + 5) + "px " + (loc.y + 6) + "px " + loc.x + "px)"
                document.all["staticmsgLetter_" + uba].style.left = ((uba) * 5) - loc.x;
                document.all["staticmsgLetter_" + uba].style.top = -loc.y
            }
        }
    }
}

function updateSeekershaded(seekerChange) {
    if (!displayStop) {
        displayStop = true;
        setTimeout("displayStop = false")
        if (seekerChange < 0) {
            seekerChange = 0
        } else if (seekerChange > 12) {
            seekerChange = 12
        }
        changeImage("seekershaded", ((seekerChange <= 4) ? 17 : ((seekerChange <= 8) ? 20 : 23)), 36, 7, 3, seekerChange + 1, 0)
        var audioPos = convertTime((elapsedDisplay) ? (songDuration / (12 / seekerChange)) - songDuration : songDuration / (12 / seekerChange))
        if (audioPos.length == 5) {
            audioPos = ":" + audioPos
        }
        for (var usj = 0; usj <= 5; usj++) {
            var loc = audioPos.charCodeAt(usj)
            if (loc != 58) {
                window.status = loc;
                loc = letters[loc];
                changeImage("shadedLetter_" + usj, loc.x, loc.y, 6, 5, (usj * 5) + ((usj < 3) ? 2 : 0), 0)
            }
        }
    }
}

function detailImage() {
    switch (mode) {
        case ("nofile"):
        case ("stop"):
            changeImage("audiodetail", 18, 0, 9, 9, 26, 28);
            changeImage("audiodetail2", 0, 0, 0, 0, 0, 0)
            break;
        case ("play"):
            changeImage("audiodetail", 3, 0, 9, 6, 29, 28);
            changeImage("audiodetail2", 36, 0, 9, 3, 24, 28)
            break;
        case ("pause"):
            changeImage("audiodetail", 9, 0, 9, 9, 26, 28);
            changeImage("audiodetail2", 0, 0, 0, 0, 0, 0)
            break;
        default:
            break
    }
}

function convertFile(file) {
    return (file.substring(Math.max(file.lastIndexOf("\\"), file.lastIndexOf("/")) + 1, file.lastIndexOf(".")))
}

function handleError() {
    command("stop");
    setMode("nofile");
    document.title = "Javascript Winamp"
    showMsg("javascript winamp", true);
    showMsg("error");
    window.onerror = new Function("");
    setTimeout("restoreText()", 1000)
    return (true)
}

function command(comm, data) {
    var audio = getPlayer();
    if(!audio) {
        console.error('something went wrong, cannot find audio player tag');
        return;
    }
    switch (comm) {
        case ("eject"):
            ejectLogic(audio);
            break;
        case ("play"):
            playLogic(audio);
            break;
        case ("pause"):
            pauseLogic(audio);
            break;
        case ("stop"):
            stopLogic(audio);
            break;
        default:
            break
    }
    detailImage();
}
var acceptedFileTypes = new Array("mp3", "ogg", "wav")

function showSeeker() {
    if(!seeker) {
        console.error('cannot find object seeker in scope');
    }
    seeker.classList.remove('hide');
    seekershaded.classList.remove('hide');
}
function setMode(newMode) {
    mode = newMode;
}
function ejectLogic(playerElem) {
    setMode('nofile');
    ejectAudio(playerElem);
    grabFile(getFileGrabber())
}
function playLogic(playerElem) {
    if(isValidSRC(playerElem.src)) {
        playAudio(playerElem);
        setMode('play');
        showSeeker();
    } else {
        grabFile(getFileGrabber())
    }
}
function pauseLogic(playerElem) {
  if(!playerElem.paused) {
      pauseAudio(playerElem);
      setMode('pause');
  } else {
      if(isValidSRC(playerElem.src)) {
          command('play');
      }
  }
}
function stopLogic(playerElem) {
    stopAudio(playerElem);
    setMode('stop');
}
function isValidSRC(src) {
    return (src.length > 4)
}
function ejectAudio(playerElem) {
    playerElem.src = '';
}
function playAudio(playerElem) {
    playerElem.play();
}
function pauseAudio(playerElem) {
    playerElem.pause();
}
function stopAudio(playerElem) {
    pauseAudio(playerElem);
    playerElem.currentTime = 0;
}
function getPlayer() {
    return document.querySelector('#playerobj');
}
function getFileGrabber() {
    return document.querySelector('#filegrabber');
}
function grabFile(fileElem) {
    fileElem.click();
}
