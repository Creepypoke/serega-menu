(function (nav) {
    var products = document.getElementById('products')
    var productsButton = document.getElementById('products-button')
    var productsDashboardButtonCLose = document.getElementById('products-dashboard-close')
    var productsDashboard = document.getElementById('products-dashboard')

    var tabsList = document.getElementsByClassName('catalog-tab')
    var tabListWrapper = document.querySelector('[role="tablist"]')
    
    var currentTab = 0

    var keys = {
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        delete: 46
    }

    function forEach(collection, handler) {
        var index = 0
        for (var k in collection) {
            if (collection.hasOwnProperty(k)) {
                handler(collection[k], index)
            }
        }
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
        productsDashboardButtonCLose.setAttribute('aria-expanded', !isExpanded)
        productsButton.setAttribute('aria-expanded', isExpanded)
    }
    
    function closeDashboard () {
        productsDashboard.className = 'dashboard hidden'
        productsDashboard.setAttribute('aria-hidden', true)
        productsButton.setAttribute('aria-expanded', false)
        productsDashboardButtonCLose.setAttribute('aria-expanded', false)
        
    }

    function activeTab (tabElement) {
        var tabsList = document.getElementsByClassName('catalog-tab')
        var tabPanel = document.getElementById(tabElement.getAttribute('aria-controls'))

        forEach(tabsList, function(element) {
            if (element !== tabElement) {
                element.setAttribute('aria-selected', 'false')
                var tabPanel = document.getElementById(element.getAttribute('aria-controls'))
                tabPanel.className = 'catalog-tab-panel hidden'
            }
        })

        tabElement.setAttribute('aria-selected', 'true')
        tabPanel.className = 'catalog-tab-panel'

    }

    addClickListener(productsButton, toggleDashboard)
    addClickListener(productsDashboardButtonCLose, closeDashboard)

    forEach(tabsList, function(element) {
        addClickListener(element, function() { activeTab(element) })
    })

    tabListWrapper.addEventListener('keyup', function(e) {
        var key = e.keyCode

        switch(key) {
            case keys.right:
                if (currentTab < tabsList.length - 1) {
                    currentTab += 1
                }
                break
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
    })
    
    
    
    

})(window.navigationData)
