(function (nav) {
    var products = document.getElementById('products')
    var productsButton = document.getElementById('products-button')
    var productsDashboard = document.getElementById('products-dashboard')

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
        productsButton.setAttribute('aria-expanded', isExpanded)
    }

    function selectTab (tabElement) {
        console.log('selectTab')


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

    var tabsList = document.getElementsByClassName('catalog-tab')

    forEach(tabsList, function(element) {
        addClickListener(element, function() {selectTab(element)})
    })

})(window.navigationData)
