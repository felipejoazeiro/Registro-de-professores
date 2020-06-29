const page = location.pathname
const menu = document.querySelectorAll("header .links a")

for(item of menu){
    if(page.includes(item.getAttribute("href"))){
        item.classList.add('active')
    }
}