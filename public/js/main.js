
// add search field in DOM
const header = document.querySelector('#header');
header.innerHTML += `<div id="search">
                        <input class="placeholder" placeholder="Search for books..." />
                        <input id="button" type="submit" value="Search" />
                     </div>
                     `;

// DOM variables
const body = document.querySelector('body');
const rows = [...document.querySelector('tbody').querySelectorAll('tr')];
const table = document.querySelector('table');
const btnSubmit = document.querySelector('#button');
const placeholder = document.querySelector('.placeholder');
let trDisActv = rows;


// hides all rows of table
rows.map(el => {
   el.className = 'hide';
});


// adds pagination links
addPagination();


//---------------------------------
//            EVENTS
//--------------------------------

// keyboard event to search the match in table
placeholder.addEventListener('input', el => {
   const valInput =  el.target.value.toUpperCase();
   if (hasWhiteSpace(valInput)) {
      rows.map(el => {
         const arrTAGY = [];
         let stringTAGY;
         const td = [...el.querySelectorAll('td')]
         td.map(el => {
            arrTAGY.push(el.innerText);
            stringTAGY = arrTAGY.join().toUpperCase();

               if(stringTAGY.match(valInput)) {
                  el.parentNode.className = 'active';
               }
                else {
                  el.parentNode.className = 'hide';
               }
         });
      });
   }
   const trDisNone = document.querySelectorAll('.hide');
   trDisActv = [...document.querySelectorAll('.active')];
      // adds message about no match
   if(trDisNone.length === rows.length){
      if (document.querySelector('h3')) {
         document.querySelector('h3').remove();
      }
      const errorEll = document.createElement('h3');
      errorEll.className = 'errorEll';
      errorEll.innerHTML = 'Opps, we do not have that book.';
      table.appendChild(errorEll);
   } else {
      if(document.querySelector('.errorEll')){
         document.querySelector('.errorEll').remove()
      }
   }
addPagination();
clickLinks ();
}); //end keyboard event

   // click event to show active pagination links
function clickLinks () {
   document.querySelector('.pagination ul').addEventListener('click', el => {
      [...document.querySelectorAll('.activeLink')].map(el => el.className = '');
      if (el.target.tagName === "A") {
         console.log(el.target.tagName)
   el.target.parentNode.className = ('activeLink');
   hideRows(el.target.innerText);
      }
   });
}
clickLinks ();

//--------------------------------
//            FUNCTIONS
//--------------------------------


// function to create pagination links
function addPagination () {
   hideRows (1);
   if (document.querySelector('.pagination')) {
      document.querySelector('.pagination').remove();
   }
   const pagination = document.createElement('DIV');
   const navigation = document.createElement('UL');
   const tbody = document.querySelector('tbody');
   pagination.className = 'pagination';
   const pageNum = Math.ceil(trDisActv.length / 5);
   for (let i = 1; i <= pageNum; i++) {
      let link = `<li><a href="#">${i}</a></li>`;
      navigation.innerHTML += link;
   }
   pagination.appendChild(navigation);
   body.appendChild(pagination);
   if (document.querySelector('.pagination ul').firstChild) {
      document.querySelector('.pagination ul').firstChild.className = ('activeLink');
   }
}

//function to show only 5 rows of table
function hideRows (index) {
   const rows = [...document.querySelector('tbody').querySelectorAll('tr')];
   rows.map(el => {
      el.className = 'hide';
   });
   for (let i = (index * 5 - 5); i < (index * 5); i++) {
      // console.log(i)
      if (trDisActv[i]) {
         trDisActv[i].className = 'active';
      }
   }
}

// function to check blankspace

function hasWhiteSpace(s){
     reWhiteSpace = new RegExp(/^\s+$/);
     if (reWhiteSpace.test(s)) {
          return false;
     }
     return true;
}
