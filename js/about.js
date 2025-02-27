document.addEventListener("DOMContentLoaded", function () {
  const teamMembers = document.querySelectorAll(".text-center");

  teamMembers.forEach((member) => {
    member.addEventListener("mouseover", function () {
      this.style.transform = "scale(1.1)";
      this.style.transition = "transform 0.3s ease-in-out";
    });

    member.addEventListener("mouseout", function () {
      this.style.transform = "scale(1)";
    });
  });

  console.log("About Us page script loaded successfully!");
});
