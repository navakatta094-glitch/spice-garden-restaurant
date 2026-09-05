function toggleMenu(){
  document.getElementById("navLinks").classList.toggle("show");
}
document.querySelectorAll(".nav-links a").forEach(link=>{
  link.addEventListener("click",()=>document.getElementById("navLinks").classList.remove("show"));
});
function bookTable(event){
  event.preventDefault();
  const name=document.getElementById("name").value;
  const phone=document.getElementById("phone").value;
  const date=document.getElementById("date").value;
  const people=document.getElementById("people").value;
  alert(`Thank you, ${name}! Your table request for ${people} person(s) on ${date} has been received. We will contact you at ${phone}.`);
  event.target.reset();
}
