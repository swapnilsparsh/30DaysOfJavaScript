const search = document.querySelector('.search')
const searchBtn = document.querySelector('.search-btn')
const loader = document.querySelector('.loader')
const detailsContainer = document.querySelector('.details-container')
let available = document.querySelector('.available')

let domainName = document.querySelector('.domain-name')
let regStatus = document.querySelector('.status')
let registrant = document.querySelector('.registrant')
let dateCreated = document.querySelector('.date-created')
let dateExpires = document.querySelector('.date-expires')


searchBtn.addEventListener('click', () => {
    loader.style.display = 'inline-block'

    let query = search.value;
    let URL = `https://api.whoapi.com/?apikey=6893050c4cb65bedd1e7315915b8afec&r=whois&domain=${query}`

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            loader.style.display = 'none'
            detailsContainer.style.display = 'flex'

            if (data.status === '0') {
                let domainInfo = data;

                if (domainInfo.registered === true) {
                    available.innerHTML = `The Domain ${domainInfo.domain_name} is NOT Available`
                    regStatus.innerHTML = 'Registered'
                    domainName.innerHTML = domainInfo.domain_name;
                    registrant.innerHTML = domainInfo.contacts[0].organization
                    dateExpires.innerHTML = domainInfo.date_expires.slice(0, 11)
                    dateCreated.innerHTML = domainInfo.date_created.slice(0, 11)
                } else {
                    available.innerHTML = `The Domain ${domainInfo.domain_name} is Available`
                    detailsContainer.style.display = 'none'
                }
            }
            else {
                available.innerHTML = `${data.status_desc}`
                detailsContainer.style.display = 'none'
            }

        })
        .catch(err => { throw (err) })
    search.value = ''
})