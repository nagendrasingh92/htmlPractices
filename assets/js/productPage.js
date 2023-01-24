
const productBox = [
    {
        id: 1,
        name: "Fujifilm Mirrorless Camera",
        discription: "X-A7 24.2 MP Mirrorless Camera with XC 15-45 mm Lens-Camel",
        oldPrice: 6000,
        newPrice: 4500,
        img: "/assets/image/fujifilmMirrorlessCamera.jpg",
        alt: "Fujifilm Mirrorless Camera",
        code: 1001,
        currency: "SEK",
    },
    {
        id: 2,
        name: "FitBit Versa Smartwatch",
        discription: "Versa 3 Health & Fitness Smartwatch with GPS and heart-rate tracking",
        oldPrice: 2000,
        newPrice: 1600,
        img: "/assets/image/FitBitVersaSmartWatch.jpg",
        alt: "FitBit Versa Smartwatch",
        code: 1002,
        currency: "SEK",

    },
    {
        id: 3,
        name: "Sony Wireless Headphones",
        discription: "WI-C100 Headphones with Noise cancellation for easier handsfree experience-Bule",
        oldPrice: "",
        newPrice: 300,
        img: "/assets/image/sonyWirelessHeadphones.jpg",
        alt: "Sony Wireless Headphones",
        code: 1003,
        currency: "SEK",

    },
    {
        id: 4,
        name: "Bose Portable Speaker",
        discription: "SoundLink Flex Bluetooth Portable Speaker, Wireless Waterproof Speaker for Outdoor Travel-Black",
        oldPrice: 2000,
        newPrice: 1800,
        img: "/assets/image/bosePortableSpeaker.jpg",
        alt: "Bose Portable Speaker",
        code: 1004,
        currency: "SEK",

    },
    {
        id: 5,
        name: "SAMSUNG Galaxy Tablet",
        discription: "A8 Android Tablet WiFi 7040mAh Battery 10.5 Inch TFT Screen Four Speakers 32GB/3GB RAM Rose Go...",
        oldPrice: "",
        newPrice: 2000,
        img: "/assets/image/samsungGalaxyTablet.jpg",
        alt: "SAMSUNG Galaxy Tablet",
        code: 1005,
        currency: "SEK",

    },
    {
        id: 6,
        name: "ESPON Inkjet Printer",
        discription: "EPSON WorkForce Pro WF-3820 DWF All-in-One Priter. Fax, scan, copy & print",
        oldPrice: 3000,
        newPrice: 2500,
        img: "/assets/image/epsonInkjetPrinter.jpg",
        alt: "ESPON Inkjet Printer",
        code: 1006,
        currency: "SEK",

    }
]

let wishListData = [];
function showProduct() {
    let productEle = document.querySelector('.productContainer');

    let temp = productBox.reduce((data = '', item) => {
        return data += `
        <div class="productBorder" data-id="${item.id}">
            <div class="cardHeaderWrap">
                <div class="productImage">
                    <img class="" src="${item.img}" alt="${item.alt}">
                </div>
            </div>
            <div class="cardContentWrap">
                <div class="productName">
                    ${item.name}
                </div>
                <div class="productDiscription">
                    ${item.discription}
                </div><br>
                <div>
                    Product code: ${item.code}
                </div> <br>
            </div>
            <div class=moreInformationWrap>
                <span class="moreInformation">
                    See More information
                </span>
                <i style="font-size:10px" class="fa">&#xf078;</i>
            </div>
            <div class="cardFooterWrap">
                <div class="price">
                    <span>Price: ${item.currency} ${item.newPrice}</span> ${item.oldPrice ? "<span class='oldPrice'>"+item.currency+ item.oldPrice+"</span>" : '' }  
                </div>
                <div class=addListWrap>
                    <span class="addList">Add to list</span>
                </div>
            </div>
        </div>
        `;
    }, '');
    productEle.innerHTML = temp;

    let btns = document.getElementsByClassName('addList');
    for (let item of btns) {
        item.addEventListener('click', function (event) {
            addWishList(event.target.closest('.productBorder').dataset.id)
        });
    }
}

function addWishList(id) {
    let temp = productBox.filter((item) => item.id == id);
    if (!wishListData.includes(parseInt(id))) {
        wishListData.push(parseInt(id));
    } else {
        alert('Already added')
    }
    showWishList();
}

function showWishList() {
    let wishListEle = document.getElementsByClassName('productSelected')[0];
    let wishListDataTemp = productBox.filter((item) => wishListData.includes(item.id));
    let temp = wishListDataTemp.reduce((data = '', item) => {
        return data += `
        <li class="listBorder" data-id="${item.id}">
            <span class="selectedProduct">${item.name} - ${item.currency} ${item.newPrice}(You saved: ${item.currency} ${item.oldPrice ?  (item.oldPrice - item.newPrice) :  item.newPrice})</span> 
            <span class="remove">Remove</span>
        </li>
        `;
    }, '');
    wishListEle.innerHTML = temp;
    removeBtn();
    totalWishList();
}

function removeBtn() {
    let btns = document.getElementsByClassName('remove');
    for (let item of btns) {
        item.addEventListener('click', function (event) {
            deleteTask(event.target.dataset.id);
        })
    }
}

function deleteTask(id) {
    wishListData.splice(parseInt(id), 1);
    showWishList();
}

function totalWishList() {
    let totalEle = document.getElementsByClassName('total')[0];
    let wishListDataTemp = productBox.filter((item) => wishListData.includes(item.id));
    let temp = wishListDataTemp.reduce((data = 0, item) => {
        return data += parseInt(`${item.newPrice}`);
    }, 0);
    totalEle.innerHTML = temp;
    console.log("hi", typeof temp)
}