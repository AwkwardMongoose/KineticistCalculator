var char = undefined;
var charId = window.location.href.indexOf("#") >= 0 ? window.location.href.indexOf("#") : null;
var moveArray = document.getElementsByName('gather')
var moveLabels = document.getElementsByName('glbl')
const select = document.getElementById('blastselect');
var burnTot = {
    "base": 0,
    "gather": 0,
    "inf": 0,
    "meta": 0,
    "other": 0,
    "mburn": 0,
    "total": 0
}

var mythTot =  {
    "base": 0,
    "gather": 0,
    "inf": 0,
    "meta": 0,
    "other": 0,
    "mburn": 0,
    "total": 0
}

if (window.location.href.indexOf('#') >= 0) {
    char = window.location.href.substring(window.location.href.indexOf("#")+1)
} else {
    char = null;
}

var charObj = window[char];
console.log(window)

var checkStatus = false;
moveArray.forEach(ch => {
    ch.addEventListener('change', () => {
        moveArray.forEach(ch2 => {
            if (ch.id != ch2.id) {
                ch2.checked = false
            }
        })
        if (ch.checked) {
            if (charObj.supercharge == true) {
                switch (ch.id) {
                    case 'move':
                        burnTot.gather = -2
                    break
                    case 'dblmove':
                        burnTot.gather = -3
                    break
                    case 'full':
                        burnTot.gather = -3
                    break
                    case 'fullmove':
                        burnTot.gather = -5
                    break
                }
            } else {
                switch (ch.id) {
                    case 'move':
                        burnTot.gather = -1
                    break
                    case 'dblmove':
                        burnTot.gather = -2
                    break
                    case 'full':
                        burnTot.gather = -2
                    break
                    case 'fullmove':
                        burnTot.gather = -3
                    break
                }
            }
            calculate()
        } else {
            burnTot.gather = 0
            calculate()
        }
    })
})

moveLabels.forEach(lbl => {
    let burn = document.createElement('span');
    burn.classList.add('reduct');
    if (charObj.supercharge == true) {
        switch (lbl.htmlFor) {
            case 'move':
                burn.innerText = ' -2'
            break
            case 'dblmove':
                burn.innerText = ' -4'
            break
            case 'full':
                burn.innerText = ' -3'
            break
            case 'fullmove':
                burn.innerText = ' -5'
            break
        }
    } else {
        switch (lbl.htmlFor) {
            case 'move':
                burn.innerText = ' -1'
            break
            case 'dblmove':
                burn.innerText = ' -2'
            break
            case 'full':
                burn.innerText = ' -2'
            break
            case 'fullmove':
                burn.innerText = ' -3'
            break
        }
    }
    lbl.appendChild(burn)
})

if (charObj.mythic == true) {
    let subMyth = document.getElementById('submythic');
    let mythSwap = Array.from(document.getElementsByClassName('swapshell'));
    console.log(mythSwap)
    subMyth.classList.remove('hide')
    if (charObj.mythicburn == true) {
        mythSwap.forEach(el => {
            el.classList.remove('hide')
        })
    }
}

charObj.blasts.forEach(bl => {
    let opt = document.createElement('option');
    opt.classList.add('option');
    opt.innerText = bl.name;
    opt.value = bl.burn;
    select.appendChild(opt)
    console.log(bl.name);
    if (document.getElementById('burncost')) {
        document.getElementById('burncost').remove();
    }
    let burnloc = document.getElementById('blastburn');
    let burn = document.createElement('span');
    burn.classList.add('cost');
    burn.innerText = select.value;
    burn.id = 'burncost'
    burnloc.appendChild(burn)
})



select.addEventListener('change', () => {
    if (document.getElementById('burncost')) {
        document.getElementById('burncost').remove();
    }
    let burnloc = document.getElementById('blastburn');
    let burn = document.createElement('span');
    burn.classList.add('cost');
    burn.innerText = select.value;
    burn.id = 'burncost'
    burnloc.appendChild(burn)
    burnTot.base = select.value;
    calculate()
})

burnTot.base = select.value;

charObj.inf.forEach(el => {
    if (el.name) {
        let lst = document.getElementById('infusions');
        let lstdiv = document.createElement('div');
        let chk = document.createElement('input');
        let lbl = document.createElement('label');
        let burn = document.createElement('span');
        chk.type = 'checkbox';
        chk.id = el.id;
        chk.dataset.type = 'inf';
        chk.dataset.burn = el.burn;
        chk.classList.add('checkbox')
        lbl.htmlFor = chk.id;
        lbl.innerText = el.name+" ("+el.type+")"
        lbl.classList.add('content')
        if (el.desc) {
            lbl.title = el.desc;
        }
        burn.innerText = el.burn >= 0 ? " +"+el.burn : " "+el.burn;
        burn.classList.add(el.burn >= 1 ? "increase" : "reduct")
        lstdiv.appendChild(chk)
        lstdiv.appendChild(lbl)
        lst.appendChild(lstdiv)
        lbl.appendChild(burn)
    }
})

const infSpec = document.getElementById('infspec');
if (charObj.infspec > 0) {
    infSpec.classList.remove('hide')
}
var infNum = document.createElement('span');
infNum.innerText = charObj.infspec;
infSpec.appendChild(infNum)

charObj.meta.forEach(el => {
    if (el.name) {
        let lst = document.getElementById('meta');
        let lstdiv = document.createElement('div');
        let chk = document.createElement('input');
        let lbl = document.createElement('label');
        let burn = document.createElement('span');
        chk.type = 'checkbox';
        chk.id = el.id;
        chk.dataset.type = 'meta';
        chk.dataset.burn = el.burn;
        chk.classList.add('checkbox')
        lbl.htmlFor = chk.id;
        lbl.innerText = el.name
        lbl.classList.add('content')
        if (el.desc) {
            lbl.title = el.desc;
        }
        burn.innerText = el.burn >= 0 ? " +"+el.burn : " "+el.burn;
        burn.classList.add(el.burn >= 1 ? "increase" : "reduct")
        lstdiv.appendChild(chk)
        lstdiv.appendChild(lbl)
        lst.appendChild(lstdiv)
        lbl.appendChild(burn)
    }
})

charObj.other.forEach(el => {
    if (el.name) {
        let lst = document.getElementById('other');
        let lstdiv = document.createElement('div');
        let chk = document.createElement('input');
        let lbl = document.createElement('label');
        let burn = document.createElement('span');
        chk.type = 'checkbox';
        chk.id = el.id;
        chk.dataset.type = 'other';
        chk.dataset.burn = el.burn;
        if (el.mythic) {
            chk.dataset.mythic = el.mythic;
        } else {
            chk.dataset.mythic = 0;
        }
        chk.classList.add('checkbox')
        lbl.htmlFor = chk.id;
        lbl.innerText = el.name
        lbl.classList.add('content')
        if (el.desc) {
            lbl.title = el.desc;
        }
        burn.innerText = el.burn >= 0 ? " +"+el.burn : " "+el.burn;
        burn.classList.add(el.burn >= 1 ? "increase" : "reduct")
        lstdiv.appendChild(chk)
        lstdiv.appendChild(lbl)
        lst.appendChild(lstdiv)
        lbl.appendChild(burn)
    }
})

function calculate() {
    let burnNum = document.getElementById('burnnum')
    let burnArr = [];
    for (x in burnTot) {
        if (x != 'mburn' && x != 'total') {
            burnArr.push(burnTot[x]);
        } else if (x != 'total') {
            burnArr.push(0-burnTot[x])
        }
    }
    burnTot.total = parseInt(eval(burnArr.join('+'))) >= 0 ? parseInt(eval(burnArr.join('+'))) : 0;
    burnNum.innerText = mythTot.mburn+burnTot.total;

    let mythNum = document.getElementById('mythnum')
    let mythArr = [];
    for (x in mythTot) {
        if (x != 'mburn' && x != 'total') {
            mythArr.push(mythTot[x]);
        } else if (x != 'total') {
            mythArr.push(0-mythTot[x])
        }
    }
    mythTot.total = parseInt(eval(mythArr.join('+'))) >= 0 ? parseInt(eval(mythArr.join('+'))) : 0;
    mythNum.innerText = burnTot.mburn+mythTot.total;

    let maxBurn = document.getElementById('maxburn');
    if (burnTot.total+mythTot.mburn > charObj.maxburn) {
        maxBurn.classList.remove('hide')
    } else {
        maxBurn.classList.add('hide')
    }
}


let check = Array.from(document.getElementsByTagName('input'));
var infTot = 0;
var metaTot = 0;
var otherTot = 0;
var otherMythTot = 0;
check.forEach(el => {
    if (el.dataset.type == 'inf') {
        el.addEventListener('change', () => {
            if (el.checked) {
                infTot += parseInt(el.dataset.burn);
            } else {
                infTot -= parseInt(el.dataset.burn);
            }
            burnTot.inf = infTot-charObj.infspec >= 0 ? infTot-charObj.infspec : 0;
            calculate()
        })
    }
    if (el.dataset.type == 'meta') {
        el.addEventListener('change', () => {
            if (el.checked) {
                metaTot += parseInt(el.dataset.burn);
            } else {
                metaTot -= parseInt(el.dataset.burn);
            }
            burnTot.meta = metaTot >= 0 ? metaTot : 0;
            calculate()
        })
    }
    if (el.dataset.type == 'other') {
        el.addEventListener('change', () => {
            //console.log('Other:',0+parseInt(el.dataset.burn))
            if (el.checked) {
                otherTot += 0+parseInt(el.dataset.burn);
                otherMythTot += 0+parseInt(el.dataset.mythic);
            } else {
                otherTot -= 0+parseInt(el.dataset.burn);
                otherMythTot -= 0+parseInt(el.dataset.mythic);
            }
            burnTot.other = otherTot;
            mythTot.other = otherMythTot;
            calculate()
        })
    }
})

var numButtons = Array.from(document.getElementsByClassName('swapbutton'));
var burnSwap = document.getElementById('burnswap');
var mythSwap = document.getElementById('mythswap');
burnTot.mburn = 0;
mythTot.mburn = 0;
burnSwap.innerText = burnTot.mburn;
mythSwap.innerText = mythTot.mburn;
numButtons.forEach(el => {
    switch (el.id) {
        case "burnleft":
            el.addEventListener('click', () => {
                if (burnTot.mburn > 0) {
                    burnTot.mburn -= 1
                } else {
                    burnTot.mburn = 0
                }
                burnSwap.innerText = burnTot.mburn;
                calculate()
            })
        break
        case "burnright":
            el.addEventListener('click', () => {
                if (burnTot.mburn < burnTot.total+burnTot.mburn) {
                    burnTot.mburn += 1
                } else {
                    burnTot.mburn += 0
                }
                burnSwap.innerText = burnTot.mburn;
                calculate()
            })
        break
        case "mythleft":
            el.addEventListener('click', () => {
                if (mythTot.mburn > 0) {
                    mythTot.mburn -= 1
                } else {
                    mythTot.mburn = 0
                }
                mythSwap.innerText = mythTot.mburn;
                calculate()
            })
        break
        case "mythright":
            el.addEventListener('click', () => {
                if (mythTot.mburn < mythTot.total+mythTot.mburn) {
                    mythTot.mburn += 1
                } else {
                    mythTot.mburn += 0
                }
                mythSwap.innerText = mythTot.mburn;
                calculate()
            })
        break
    }
})
calculate()