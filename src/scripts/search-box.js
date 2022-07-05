import Fuse from 'fuse.js'
import AllCharts from '../content/charts.json'

const now = new Date();
const month = now.getMonth()
const tisTheSeason = now.getMonth() > 9 // (January gives 0)
const charts = tisTheSeason ? AllCharts : AllCharts.filter(c => c.categories.includes("christmas") === false)

const padFromNumber = (n) => {
  let pad = ''
  const chartNumber = parseInt(n)
  if (chartNumber > 200) {
    pad = 'black'
  } else if (chartNumber > 100) {
    pad = 'red'
  } else if (chartNumber > 0) {
    pad = 'blue'
  }
  return pad
}

charts.forEach(chart => {
  chart.pad = padFromNumber(chart.number)
})

let search = ''
let matches = []
let filteredMatches = []
const searchbox = document.querySelector('#search-box');


const options = {
  includeScore: true,
  threshold: 0.6,
  keys: ['title', {
    name: 'number',
    weight: 2,
  }]
}

const fuse = new Fuse(charts, options)

const uniq = charts
  .map((chart) => {
    return {
      count: 1,
      chart: chart.number
    };
  })
  .reduce((result, b) => {
    result[b.chart] = (result[b.chart] || 0) + b.count;

    return result;
  }, {});

  const duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);

const isNumber = (value) => {
  const parsed = parseInt(value)
  return typeof parsed === 'number' && !isNaN(parsed)
}

const clearChildren = (el) => {
  while (el.firstChild) {
    el.removeChild(el.lastChild);
  }
}

const createResultElement = (chart) => {
  const div = document.createElement("div")
  div.setAttribute('data-pad', chart.pad)
  const chartTitle = document.createElement("p")
  const chartTitleText = document.createTextNode(chart.title)
  chartTitle.appendChild(chartTitleText)

  const chartNumber = document.createElement("div")
  chartNumber.setAttribute('class', 'chart-number')
  const chartNumberText = document.createTextNode(chart.number)
  chartNumber.appendChild(chartNumberText)

  div.appendChild(chartNumber)
  div.appendChild(chartTitle)

  if (chart.categories) {
    const chartCategories = document.createElement("ul")
    chart.categories.forEach(category => {
      const categoryEl = document.createElement("li")
      const categoryText = document.createTextNode(category)
      categoryEl.appendChild(categoryText)
      chartCategories.appendChild(categoryEl)
    })
    div.appendChild(chartCategories)
  }

  return div
}

const addResult = (chart, container) => {
  const element = createResultElement(chart.item)
  container.append(element)
}

const showResults = () => {
  const container = document.querySelector('.found')
  clearChildren(container)
  if (matches.length === 0 || (matches[0] && matches[0] === undefined)) return
  const totalFiltered = matches.length
  const totalToShow = isNumber(search) ? 1 : Math.min(totalFiltered, 3)
  for (let i = 0; i < totalToShow; i++) {
    addResult(matches[i], container)
  }
}

const doSearch = (e) => {
  search = e.target.value
  if (search) {
    matches = fuse.search(search)
  } else {
    matches = []
  }
  showResults()
}

searchbox.addEventListener('input', doSearch)