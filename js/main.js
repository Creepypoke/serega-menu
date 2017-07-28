(function(nav, plugins) {

    this.state = {
        tree: nav.tree || null,
        productsList: nav.productsList || null
    }

    const tree = nav.tree || null
    var productsList = nav.productsList || null
    const Wade = plugins.wade || null

    const menuBar = document.createElement('ul')
    const searchingEnum = productsList.map(function(item){return item.title})
    const search = Wade(searchingEnum)

    function createSearchBar () {

        function searchFunction (e) {
            const searchedIndexes = search(e.srcElement.value)
            const searchedSections = searchedIndexes.map(function(searchObject) {
                return productsList[searchObject.index]
            })

            const newProductList = []
            for (const key in productsList) {
                for (const sKey in searchedSections) {
                    if (productsList[key] == searchedSections[sKey]) {
                        newProductList.push(productsList[key])
                    }
                }
            }
            productsList = newProductList

            document.querySelector('#navigation').innerHTML = ''

            constructMenu()

            document.querySelector('#navigation').appendChild(menuBar)
        }

        const searchBar = document.createElement('label')
        const searchInput = document.createElement('input')
        searchInput.type = 'text'
        searchInput.name = 'search-input'
        searchInput.placeholder = 'Введите название сервиса'
        searchInput['aria-label'] = 'Поиск по всем продуктам'
        searchInput.addEventListener('keyup', searchFunction)
        searchBar.appendChild(searchInput)

        return searchBar
    }

    function createSubSection () {
        const subSection = document.createElement('ul')

        return subSection
    }

    function createMenuItem (text) {
        const menuItem = document.createElement('li')
        menuItem.appendChild(document.createTextNode(text))
        return menuItem
    }

    const searchBar = createSearchBar()
    menuBar.appendChild(searchBar)


    function constructMenu () {
        console.log(productsList)
        for (const sectionIndex in tree) {
            const sectionList = tree[sectionIndex]
            const section = productsList[sectionIndex]
            if (section !== void 0) {
                menuBar.appendChild(createMenuItem(section.title))
            }

            if (Array.isArray(sectionList)) {
                const subsectionbar = createSubSection()
                for (const tmpIndex in sectionList) {
                    const subSectionID = sectionList[tmpIndex]
                    const subsection = productsList[subSectionID]
                    if (subsection !== void 0) {
                        subsectionbar.appendChild(createMenuItem(subsection.title))
                    }
                }

                menuBar.appendChild(subsectionbar)
            }
        }
    }
    constructMenu()

    document.querySelector('#navigation').appendChild(menuBar)

})(window.navigation, { wade: Wade })
