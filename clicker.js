///!CHANGE!///
let statId = ['pointCounter', 'everyCookie', 'everyClick', 'perClick', 'prestiges', 'bonus'];//points, every point, every click, cookies per click, prestiges
let ppcIds = ["ppc0", "ppc1", "ppc2", "ppc3", "ppc4", "ppc5", "ppc6", "ppc7", "ppc8", "ppc9"];
let priceids = ["itemPrice0", "itemPrice1", "itemPrice2", "itemPrice3", "itemPrice4", "itemPrice5", "itemPrice6", "itemPrice7", "itemPrice8", "itemPrice9"];
let timesBoughtIds = ["timesBought0", "timesBought1", "timesBought2", "timesBought3", "timesBought4", "timesBought5", "timesBought6", "timesBought7", "timesBought8", "timesBought9"];
let informerId = ['itemInfoid0', 'itemInfoid1', 'itemInfoid2', 'itemInfoid3', 'itemInfoid4', 'itemInfoid5', 'itemInfoid6', 'itemInfoid7', 'itemInfoid8', 'itemInfoid9', ];
let upgradePriceStat = ["upgradePrice0", "upgradePrice1"];
let upgradesBoughtStat = ["upgradesBought0", "upgradesBought1"];
let inflation = .15;
let upgradeInflation = 2;
let itemsBought = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let itemValue = [15, 100, 1100, 12000, 130000, 1400000, 20000000, 330000000, 5100000000, 75000000000];
let upgradeValue = [100000, 120000000];
let upgradesBought = [0, 0];
let itemsBoughtr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let itemValuer = [15, 100, 1100, 12000, 130000, 1400000, 20000000, 330000000, 5100000000, 75000000000];
let itemPpc = [.1, 1, 8, 47, 260, 1400, 7800, 44000, 260000, 1600000];

    ///stats///
let ascendMark = 100000; //how much you have to earn to get a prestige point
let points = 0;
let everyClick = 0;
let everyPoint = 0;
let prestige = 0;
let popValue = 1;
let bonusPercent = prestige;
let valueNames = ['K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dec'];
let themeIsDark = true;

let start = () => {
    stats().update();
    shop().update();
    upgrades().update();
}

window.onload = start();

    //////////
    ///shop///
    //////////

function shop(){
    const self = {
        buyItem: (item)=>{
            if(itemsBought[item] >= 100)   return 0
            if(points < itemValue[item])  return 0;
            points -= itemValue[item];
            itemsBought[item]++;
            itemValue[item] += itemValue[item]*inflation;
            itemValue[item] = Math.round(itemValue[item]*10)/10;
            start();
        },
        sellItem: (item)=>{
            if(itemsBought[item] < 1)  return 0;
            return 0;
        },
        update: (selector = informerId) =>{
            if(selector == null)    return 0;
            for(i = 0; i < itemsBought.length; i++){
                if(points>=itemValue[i])    document.getElementById(informerId[i]).style.backgroundColor = 'green';
                else                        document.getElementById(informerId[i]).style.backgroundColor = 'red';
                document.getElementById(ppcIds[i]).innerHTML = '&#128070;:'+stats().shortenValue(itemPpc[i]+itemPpc[i]*bonusPercent/100);
                document.getElementById(priceids[i]).innerHTML = '$: '+stats().shortenValue(itemValue[i]);
                document.getElementById(timesBoughtIds[i]).innerHTML = 'x'+itemsBought[i]
            }
        }
    }
return self;
}

    ///////////
    ///stats///
    ///////////

function stats(){
    const self = {
        points: (selector = statId[0]) => {
            if(selector == null)    return 0;
            return document.getElementById(selector).innerHTML = self.shortenValue(points);
        },
        everyPoint: (selector = statId[1]) => {
            if(selector == null)    return 0;
            return document.getElementById(selector).innerHTML = self.shortenValue(everyPoint);
        },
        perClick: (selector = statId[3]) => {
            if(selector == null)    return 0;
            return document.getElementById(selector).innerHTML = self.shortenValue(popValue);
        },
        everyClick: (selector = statId[2]) => {
            if(selector == null)    return 0;
            return document.getElementById(selector).innerHTML = self.shortenValue(everyClick);
        },
        prestige: (selector = statId[4]) => {
            if(selector == null)    return 0;
            return document.getElementById(selector).innerHTML = self.shortenValue(prestige);
        },
        bonus: (selector = statId[5]) => {
            if(selector == null)    return 0;
            return document.getElementById(selector).innerHTML = self.shortenValue(bonusPercent);
        },
        update: () => {
            popValue = allItems()+1;
            popValue = popValue + popValue * bonusPercent / 100;
            bonusPercent = prestige;
            self.points();
            self.everyPoint();
            self.perClick();
            self.prestige();
            self.everyClick();
            self.bonus();
        },
        shortenValue: (value) =>{
            if(typeof(value) != 'number')   return value;
            if(value<1000) return Math.round(value*10)/10;
            let zeros = 0;
            for(let i = value; i>=10; i/=10)  zeros++;
            let convertedValue = Math.round(value / (Math.pow(10, (Math.floor(zeros/3)*3)-1)))/10;
            for(let i = 6; (i-3)/3-1<valueNames.length; i += 3){
                let pointer = (i-3)/3-1;
                let valueAddition = valueNames[pointer];
                if(zeros<i)  return convertedValue + valueAddition;
            }
            return value;
        }
    }
    return self;
}

    /////////////
    ///clicker///
    /////////////

function clicker(){
    const self = {
        addPoints: () => {
            points += popValue;
            everyPoint += popValue;
            everyClick++;
            start();
        }
    }
    return self;
}

function misc(){
    const self = {
        restart: () => {
            if(everyPoint < ascendMark) return window.alert(`You have to gain ${stats().shortenValue(ascendMark)} points`);
            let ascend = window.confirm('Do you want to ascend and add one prestige?');
            if(!ascend) return 0;
            points = 0;
            everyPoint = 0;
            everyClick = 0;
            itemsBought = itemsBoughtr;
            itemValue = itemValuer;
            prestige++;
            ascendMark += ascendMark * inflation;
            stats().update()
            shop().update()
        },
        open: (selector) => {
            document.getElementById(selector).style.display = 'flex';
            document.getElementById("sectionStats").style.display = 'none';
        },
        close: (selector) => {
            document.getElementById(selector).style.display = 'none';
            document.getElementById("sectionStats").style.display = 'flex';
        }
    }
    return self;
}

function upgrades(){
    const self = {
        buyMultiplyer: (item) => {
            if(upgradeValue[item] > points) return 0;
            upgradesBought[item]++;
            upgradeValue += upgradeValue * upgradeInflation;
            shop().update();
            stats().update();
            self.update();
        },
        buyBonus: (item) => {
            if(upgradeValue[item] > points) return 0;
            upgradesBought[item]++;
            upgradeValue += upgradeValue * upgradeInflation;
            bonusPercent += 1;
            shop().update();
            stats().update();
            self.update();
        },
        update: () => {
            for(i =0; i < upgradesBought.length; i++){
                document.getElementById(upgradePriceStat[i]).innerHTML = '$: '+stats().shortenValue(upgradeValue[i]);
                document.getElementById(upgradesBoughtStat[i]).innerHTML = 'x'+stats().shortenValue(upgradesBought[i]);
            }
        }
    }
    return self;
}

function theme(){
    const self = {
        changeTheme: () => {
            themeIsDark = !themeIsDark;
            if(themeIsDark){
                document.getElementById("usedTheme").style.color = "black";
                document.getElementById("usedTheme").innerHTML = "Dark";
                document.getElementById("themeSwitch").style.justifyContent = "flex-start";
                document.getElementById("themeSwitch").style.backgroundColor = "white";
                document.getElementById("themeColor").style.backgroundColor = "black";
                document.getElementById("mmain").style.backgroundColor = "#252526";
            }
            else{
                document.getElementById("usedTheme").style.color = "#A0A0A0";
                document.getElementById("usedTheme").innerHTML = "Lite";
                document.getElementById("themeSwitch").style.justifyContent = "flex-end";
                document.getElementById("themeSwitch").style.backgroundColor = "black";
                document.getElementById("themeColor").style.backgroundColor = "white";
                document.getElementById("mmain").style.backgroundColor = "white";
                document.getElementsByClassName("section").style.backgroundColor = "rgba(0, 0, 0, .4)";
            }
        }
    }
    return self;
}

function allItems(){
    let addPopValue = 0;
    for(let i = 0; i < itemsBought.length;i++) addPopValue += itemsBought[i]*itemPpc[i];
    if(upgradesBought[0] < 1)   return addPopValue;
    addPopValue *= 2*upgradesBought[0];
    return addPopValue;
}