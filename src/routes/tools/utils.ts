const wfm = {
    delay(ms: number = 1000) {
        return new Promise( (resolve: any, reject) => {
            setTimeout( () => {
                resolve();
            }, ms )
        } )
    }

}

export { wfm };