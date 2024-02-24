console.log(document.cookie)
document.cookie = "name=vidhvath28"
document.cookie = "name2=prabhasvarma"
document.cookie = "name=vidhuuu"
let key = prompt("enter your key")
let value = prompt("enter your value")
document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
console.log(document.cookie)