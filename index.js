  let selectedCoupon = null;

  function couponSelect(couponId, btnId) {
    const buttons = document.querySelectorAll('.btn-info');

    buttons.forEach(button => {
      button.style.backgroundColor = '';
      button.style.color = '';
      button.innerText = 'Select';
    });
    
    const selectedButton = document.getElementById(btnId);
    selectedButton.style.backgroundColor = 'green';  
    selectedButton.style.color = 'white';  
    selectedButton.innerText = 'Selected';  
    
    selectedCoupon = document.getElementById(couponId).value; 

    let couponInput = document.getElementById(couponId);
    couponInput.select();  
    couponInput.setSelectionRange(0, 99999); // For mobile devices

    // alert(`Coupon code "${couponInput.value}" has been selected. You can now copy it.`);
  }
  function toggleMenu() {
    const menuIcons = document.getElementById('menuBarIcons');
    menuIcons.style.display = menuIcons.style.display === 'block' ? 'none' : 'block';
}


  function submitCoupon() {
    if (!selectedCoupon) {
      alert("Please select a coupon before submitting.");
      return;
    }

    document.getElementById('couponSection').style.display = 'none';
    document.getElementById('thankYouCard').style.display = 'block';

    document.getElementById('submittedCoupon').innerText = selectedCoupon;

    document.getElementById('submitBtn').style.display = 'none';

    // After 2 seconds, show the coupon codes again and hide the Thank You card
    setTimeout(() => {
      document.getElementById('couponSection').style.display = 'block';
      document.getElementById('thankYouCard').style.display = 'none';
      
      document.getElementById('submitBtn').style.display = 'inline-block';

      selectedCoupon = null;

      const buttons = document.querySelectorAll('.btn-info');
      buttons.forEach(button => {
        button.style.backgroundColor = '';
        button.style.color = '';
        button.innerText = 'Select';
      });
    }, 2000); 
  }


async function getData(){
    let loader = document.getElementById("loader")
    let container = document.getElementsByClassName("container")[0]

    loader.style.display = "block";
    container.style.display = "none";

    let response=await fetch("https://brick-tourmaline-case.glitch.me/products")
    
    try{
        if(!response.ok){
            throw new Error(response.statusText)

        }
        let student = await response.json()
        student.forEach(element => {
            let container=document.getElementsByClassName("container")[0];
            let item =document.createElement("div")
            item.className="item"
            item.innerHTML=
                `
                    <img src='${element.image}'>
                    <h3>${element.productName}</h3>
                    <p>${element.description  || ""}</p>
                    <div class="footer"> 
                           <a href="https://www.amazon.com/s?k=${encodeURIComponent(element.productName)}" 
                       
                       class="buy">Buy Now</a>
                          <pre class="price" data-bs-toggle="modal" data-bs-target="#couponModal">$ ${element.price}</pre>
                    </div>

            `
            container.appendChild(item)

        });
    }catch(error){
        console.error(error)
    }
    finally{
        loader.style.display = "none";
        container.style.display = "grid";
    }
}
document.addEventListener("DOMContentLoaded",getData)