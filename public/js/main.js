
// add search field in DOM
const header = document.querySelector('#header');
header.innerHTML += `<div id="search">
                        <input class="placeholder" placeholder="Search for books..." />
                        <input id="button" type="submit" value="Search" />
                     </div>
                     `;

// DOM variables
const rows = [...document.querySelectorAll('tr')];
const btnSubmit = document.querySelector('#button');
const placeholder = document.querySelector('.placeholder');

// btnSubmit.addEventListener('click', el => el.preventDefault());

placeholder.addEventListener('input', el => {

   const valInput =  el.target.value;
   rows.map(el => {
      let arrTAGY = [];
      const td = [...el.querySelectorAll('td')]
      console.log(el)
      td.map(el => {
         if (el.children.length > 0) {
            let textTitle = el.children[0].innerHTML;
            arrTAGY.push(el.innerText);
         };

         arrTAGY.push(el.innerText);


         if (valInput != " " && valInput.length > 0 && el.innerText.match(valInput)) {
            // console.log(el.innerText);
            // console.log(el.parentNode)
            // el.parentNode.style.display = "table-row";
         }
          else {
            el.parentNode.style.display = "none";
            // console.log(el.innerText);

                  // console.log(el.parentNode)
         }

      })
      console.log(arrTAGY)
   });
});
