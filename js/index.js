
const loadAllPhone = async (show, brandName,) => {
    console.log(brandName)
    document.getElementById('spinner').classList.add('hidden')

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brandName ? brandName : "iphone"}`);
    const data = await res.json()
    // if (show) {

    //     displayAllphone(data.data)
    // }
    // else {
    //     displayAllphone(data.data.slice(0, 6))
    // }
    displayAllphone(data.data,show)
}


const ShowDetails = async (slugs) => { 
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${slugs}`)
    const data = await res.json()
      const {brand, name, releasDate, slug,image
} = data.data

    const modelContainer = document.getElementById('modalContainer')

    modelContainer.innerHTML=`
    <dialog id="my_modal_1" class="modal">
  <div class="modal-box ">
  <img  src="${image}" >
    <h3 class="font-bold text-lg">${brand}</h3>
    <p class="py-4">${name}</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    `
    my_modal_1.showModal()
}






const displayAllphone = (phones, show) => {

     const cardContainer = document.getElementById('card-section')
     const noData = document.getElementById('no-data');
     cardContainer.innerHTML = "";


       let phonesToDisplay;

    if (show === true) {
        // Show all phones
        phonesToDisplay = phones;
    } else {
        // Show only first 6 phones
        phonesToDisplay = phones.slice(0, 6);
    }
// HERE I AM CHEACING THE LENGTH OF THE SECTION
     if (phonesToDisplay.length === 0) {
        noData.classList.remove('hidden'); // Show "No Data Found"
        return; // Stop the function here
    } else {
        noData.classList.add('hidden'); // Hide message if there is data
    }

    phonesToDisplay.forEach((item) => {
        const {image,phone_name,slug} = item
        const card = document.createElement('div')
        card.classList="card card-compact w-[300px] shadow-lg shadow-indigo-500/40 gap-10"
        card.innerHTML = `
          <figure><img src="${image}" alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">${item.phone_name}</h2>
    <p>${item.slug}</p>
    <div class="card-actions ">
      
       <button   onclick="ShowDetails('${slug}')" class="btn btn-warning">Show Details</button>


        `
        cardContainer.append(card)
        
    })
   
}


const showAlldata = () => {
    // const cardSection = document.getElementById('card-section')
    loadAllPhone(true)
}


const hendleSearch = () => {

    document.getElementById('spinner').classList.remove('hidden')

    const searchText = document.getElementById("searchSection").value

    setTimeout(() => {
        loadAllPhone(false, searchText)
    }, 3000)
}


// search-section

// search-section

loadAllPhone()