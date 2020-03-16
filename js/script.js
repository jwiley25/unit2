/******************************************
Project 2 - Dynamic Web Page: Pagination and Filtering
Adapted from Treehouse FSJS Techdegree:
******************************************/


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

//gets list of student elements
const studlist = document.getElementsByClassName("student-list")[0];
const names = studlist.children

// creates and appends pag_div which will contain pag_list
const page = document.getElementsByClassName("page")[0]
const pag_div = document.createElement("div")
pag_div.className = "pagination"
page.appendChild(pag_div)

// creates pag_list which will contain pagnation buttons
const pag_list = document.createElement("ul")
pag_div.appendChild(pag_list)

//creates and appends searchdiv to contains input and button
const pag_head = document.getElementsByClassName("page-header cf")[0]
const searchdiv = document.createElement("div")
searchdiv.className = "student-search"
pag_head.appendChild(searchdiv)

//creates and appends input
const search_in = document.createElement("input")
search_in.placeholder = "Search for students..."
searchdiv.appendChild(search_in)

//creates and appends button
const search_button = document.createElement("button")
search_button.textContent = "Search"
searchdiv.appendChild(search_button)

//creates and appends alert message
const alertmes = document.createElement("h3")
alertmes.textContent = "no results found"
page.insertBefore(alertmes,studlist)


//shows page given a page number and a list of people
function showPage(page,list){
   for(let x of names){
      x.style.display = "none"
   }
   
   if(list.length == 0){
      alertmes.style.display = "block"
   }
   else{

   
   
   for(let x =1;x<list.length+1;x++){
      if(x/10> page-1 && x/10 <= page){
         list[x-1].style.display = "block"
      }
   }
   alertmes.style.display = "none"
}
   

}



// apppends the page links given a list of names
function appendPageLinks(list){
   var oldpagebuts = pag_list.children
   for(let x = oldpagebuts.length-1;x>=0;x--){
      pag_list.removeChild(oldpagebuts[x])
   }

   var numpages = Math.ceil(list.length/10)
   for(let x = 0; x < numpages;x++){
      let pageli = document.createElement("li")
      pag_list.appendChild(pageli)
      let pagebut = document.createElement("a")
      pagebut.textContent= x+1
      pageli.appendChild(pagebut)
      if(x == 0){
         pagebut.className = "active"
      }

   }
   showPage(1,list)



}
// searches names from the search bar
function search(){
   var searched_names = []
   for(let x of names){
      if((x.children[0].children[1].textContent).indexOf(search_in.value) != -1){
         searched_names.push(x)
      }
   }
   return searched_names

} 

//gives functionality to pagnation buttons
pag_list.addEventListener("click", ()=>{
      var tar = event.target


      if(tar.tagName == "A"){
         
         for(let x of pag_list.children){
            x.firstElementChild.className = ""
         }
         tar.className = "active"
         showPage(tar.textContent,search())

      }
})
//gives functionality to the search button
search_button.addEventListener("click",()=>{
   appendPageLinks(search())
})

search_in.addEventListener("keyup", ()=>{
 appendPageLinks(search())
   
})
appendPageLinks(names)







// Remember to delete the comments that came with this file, and replace them with your own code comments.