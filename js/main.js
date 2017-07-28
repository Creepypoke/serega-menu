(function (nav) {

    var props = {
        tree: nav.tree || null,
        productsList: nav.productsList || null
    }
    this.state = {}

    var noop = function () {
    }

    this.setState = function (newState, callback) {
        newState = typeof newState === 'object' && newState !== null ? newState : {}
        this.state = Object.assign(this.state, newState)

        typeof callback === 'function' ? callback.apply(this) : void 0
    }

    this.createNode = function (tagName, attributes) {
        attributes = attributes || {}
        typeof tagName === 'string' ? void 0 : function () {
            throw Error('Incorrect tag name in createNode method')
        }
        var node = document.createElement(tagName)

        for (var property in attributes) {
            if (attributes.hasOwnProperty(property)) {
                node[property] = attributes[property]
            }
        }

        return node
    }


    /* Рендер */

    function createMenuItem (title, url, hasPopup) {

    }


    var menuBar = this.createNode('nav', {
        'aria-label': 'Главное меню Сбербанк Онлайн',
        'role': 'menubar'

    })
    var navigation = document.getElementById('navigation')
    navigation.innerHTML = ''

    this.setState({}, function (a, b) {
        console.log(a + ' ' + b)
    })


    navigation.appendChild(menuBar)

})(window.navigationData)
