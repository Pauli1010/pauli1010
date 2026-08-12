
import data from "./data/main_page.json" with { type: "json" };

function fillData() {
  const about_me = document.getElementById("about_me");
  console.log(data)
  const parser = new DOMParser();
  let about_me_content = parser.parseFromString(data["bio"], 'text/html');
  console.log(about_me)
  about_me.append(...about_me_content.body.childNodes)
}

document.addEventListener("DOMContentLoaded", () => {
  fillData();
});