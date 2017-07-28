(function(nav, plugins) {

    this.state = {
        tree: nav.tree || null,
        productsList: nav.productsList || null
    }


    console.log(nav.tree === this.state.tree)

    document.querySelector('#navigation').appendChild(menuBar)

})(window.navigationData, { wade: Wade })
