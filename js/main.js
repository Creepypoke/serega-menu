(function (nav) {

    var productsButton = document.getElementById('products-button')
    var productsDashboardButtonClose = document.getElementById('products-dashboard-close')
    var productsDashboard = document.getElementById('products-dashboard')
    var searchInput = document.getElementById('search-filter')

    var tabsList = document.getElementsByClassName('catalog-tab')
    var tabListWrapper = document.querySelector('[role="tablist"]')
    
    var productsTitleElements = document.querySelectorAll('.catalog-products-product a')
    
    var productsTitles = map(productsTitleElements, function (element, index) {
        return element.innerHTML
    })

    var currentTab = 0

    var keys = {
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        esc: 27
    }

    function forEach(collection, handler) {
        var index = 0
        for (var k in collection) {
            if (collection.hasOwnProperty(k)) {
                handler(collection[k], index)
                index += 1
            }
        }
    }
    
    function map(collection, handler) {
        var index = 0
        var results = []
        for (var k in collection) {
            if (collection.hasOwnProperty(k)) {
                results.push(handler(collection[k], index))
                index += 1
            }
        }
        return results
    }

    // IE8 polyfill
    function addClickListener (element, handler) {
        if (element.addEventListener === void 0) {
            element.attachEvent('onclick', handler)
        }
        else {
            element.addEventListener('click', handler)
        }
    }

    function toggleDashboard () {
        var isExpanded = productsDashboard.className.indexOf('hidden') !== -1
        productsDashboard.className = isExpanded ? 'dashboard' : 'dashboard hidden'
        productsDashboard.setAttribute('aria-hidden', !isExpanded)
        productsDashboardButtonClose.setAttribute('aria-expanded', !isExpanded)
        productsButton.setAttribute('aria-expanded', isExpanded)
    }

    function closeDashboard () {
        productsDashboard.className = 'dashboard hidden'
        productsDashboard.setAttribute('aria-hidden', true)
        productsButton.setAttribute('aria-expanded', false)
        productsDashboardButtonClose.setAttribute('aria-expanded', false)

    }

    function activeTab (tabElement, withoutFocus) {
        withoutFocus = withoutFocus || false
        var tabsList = document.getElementsByClassName('catalog-tab')
        var tabPanel = document.getElementById(tabElement.getAttribute('aria-controls'))

        forEach(tabsList, function(element) {
            if (element !== tabElement) {
                element.setAttribute('aria-selected', 'false')
                element.className = 'catalog-tab'
                var tabPanel = document.getElementById(element.getAttribute('aria-controls'))
                tabPanel.className = 'catalog-tab-panel hidden'
            }
        })

        tabElement.setAttribute('aria-selected', 'true')
        if (!withoutFocus) {
            tabElement.focus()
        }
        tabElement.className = 'catalog-tab catalog-tab_active'
        tabPanel.className = 'catalog-tab-panel'

    }

    function changeTabFocus (e) {
        var key = e.keyCode

        switch(key) {
            case keys.down:
            case keys.right:
                if (currentTab < tabsList.length - 1) {
                    currentTab += 1
                }
                break
            case keys.up:
            case keys.left:
                if (currentTab > 0) {
                    currentTab -= 1
                }
                break
            case keys.end:
                currentTab = tabsList.length - 1
                break
            case keys.home:
                currentTab = 0
                break
            default:
                return e.preventDefault()
        }

        var currentTabElement = tabsList[currentTab]
        if (currentTabElement !== void 0) {
            activeTab(tabsList[currentTab])
        }
    }

    addClickListener(productsButton, toggleDashboard)
    addClickListener(productsDashboardButtonClose, closeDashboard)

    window.addEventListener('keyup', function(e) {
        if (productsDashboard.className !== 'dashboard hidden' && e.keyCode === keys.esc) {
            console.log(e.keyCode)
            closeDashboard()
        }
    })

    forEach(tabsList, function(element) {
        addClickListener(element, function() { activeTab(element) })
    })

    tabListWrapper.addEventListener('keyup', changeTabFocus)
    
    searchInput.addEventListener('keyup', function (e) {
        var searchInputValue = e.target.value.trim()
        
        var matched = new RegExp(`.*${searchInputValue}.*`, 'gi')
        
        
        forEach(productsTitles, function(title, index) {
            var isFounded = title.search(matched)
            productsTitleElements[index].className = isFounded !== -1 ? '' : 'hidden'
        })
        console.log('-----------')
        
        // forEach(filteredElements, function (result, index) {
        //     var element = productsTitleElements[index]
        //     if (result) {
        //         result.className = 'catalog-products-product'
        //     }
        //     else {
        //         element.className = 'catalog-products-product hidden'
        //     }
        // })
    })
    
    if (tabsList[0] !== void 0) {
        activeTab(tabsList[0], true)
    }

})(window.navigationData)
