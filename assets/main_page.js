import Handlebars from 'https://cdn.jsdelivr.net/npm/handlebars@4.7.8/+esm';
import data from "./data/main_page.json" with { type: "json" };
import projects_data from "./data/projects.json" with { type: "json" };

function fillBioData() {
  const about_me = document.getElementById("about_me");
  const parser = new DOMParser();
  let paragraphed = data["bio"] instanceof Array ? data["bio"].map((el) => `<p>${el}</p>`).join('') : data["bio"]
  let about_me_content = parser.parseFromString(paragraphed, 'text/html');

  about_me.append(...about_me_content.body.childNodes)
}

function getRandomElements(array, count) {
  const indices = new Set();          // holds unique index numbers, e.g. {2, 7, 0}
  const max = Math.min(count, array.length);

  while (indices.size < max) {
    indices.add(Math.floor(Math.random() * array.length)); // random index 0..length-1
  }

  return [...indices].map((i) => array[i]); // turn indices into actual project objects
}

function fillProjectsData() {
  if (projects_data.length <= 0) return;

  const projects = document.getElementById("projects");

  Handlebars.registerHelper('print_technologies', function (array) {
    return array.join(', ')
  });

  const template = Handlebars.compile(`
    <a href="{{url}}" target="_blank" class="project">
      <h3><span>{{name}}</span></h3>
      <div class="image-box">
        {{#if image}}<img id="{{image}}"/>{{/if}}
      </div>
      <div class="lead">{{lead}}</div>
      <div class="technologies"> {{print_technologies technologies}} </div>
    </a>`
  );
  const parser = new DOMParser();

  const selected_projects = projects_data.length > 3 ? getRandomElements(projects_data, 3) : projects_data
  selected_projects.forEach((element) => {
    let project_html = template(element)
    let project_content = parser.parseFromString(project_html, 'text/html');
    projects.append(...project_content.body.childNodes)

    if (!element["image"]) return

    let image = document.getElementById(element["image"])
    image.src = "./assets/images/" + element["image"];
  });
}

fillBioData();
// fillProjectsData(); //bring back after more projects are added
