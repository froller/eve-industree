const fs = require('fs')

class JSONL {

    constructor(filename) {
        this.data = fs.readFileSync(filename, 'utf-8')
            .split('\n')
            .filter(line => line.trim())
            .map(line => JSON.parse(line))
    }

    get(key) {
        return this.data.find(r => { return r._key == key })
    }

    find(x) {
        return this.data.find(x)
    }

    filter(x) {
        return this.data.filter(x)
    }

    all() {
        return this.data
    }

}

class SDEDataSource extends JSONL {
    #stripOtherLocales = 'en';
    constructor(filename) {
        super(filename)

        // Create index
        this.index = Object();
        for (let i in this.data)
            this.index[this.data[i]._key] = i // maps _key to index in data

        // Strip other languages for debug
        if (this.#stripOtherLocales)
            this.data.filter(json => {   // HACK using .filter() as .each()
                let rv = json
                if (json.name && typeof json.name === 'object')
                    rv.name = json.name[this.#stripOtherLocales]
                if (json.description && typeof json.description === 'object')
                    rv.description = json.description[this.#stripOtherLocales]
                return true
            })
    }

    get(key) {
        let r = this.data[this.index[key]]
        return r
    }
}

class SDETypes extends SDEDataSource {
    constructor(path) {
        super(path + 'types.jsonl')
    }

    findText(re) {
        return this.filter(t => {
            if (typeof t.name === 'object') {
                for (let lang in t.name)
                    if (t.name[lang].match(re))
                        return true
                return false
            }
            return t.name.match(re)
        })
    }

    findByName(re) {
        let found = this.findText(re)
        if (found instanceof Array && found.length == 1)
            return found[0]
        return found
    }
}

class SDETypeMaterials extends SDEDataSource {
    constructor(path) {
        super(path + 'typeMaterials.jsonl')
    }
}

class SDEGroups extends SDEDataSource {
    constructor(path) {
        super(path + 'groups.jsonl')
    }
}

class SDEBlueprints extends SDEDataSource {
    constructor(path) {
        super(path + 'blueprints.jsonl')
    }
}

class SDEDataBase {
    #types
    #groups
    #typeMaterials
    #blueprints
    constructor(path) {
        if (path === undefined)
            path = './'
        this.#types = new SDETypes(path)
        this.#groups = new SDEGroups(path)
        this.#typeMaterials = new SDETypeMaterials(path)
        this.#blueprints = new SDEBlueprints(path)

        // Cross-linking
        this.#blueprints.data.forEach(b => {
            if (b.activities.manufacturing
                && b.activities.manufacturing.products
                && b.activities.manufacturing.products[0].typeID
            ) {
                let t = this.#types.data[this.#types.index[b.activities.manufacturing.products[0].typeID]]
                if (t)
                    t['blueprintTypeID'] = b._key
            }
        })
    }

    Types() {
        return this.#types
    }

    Groups() {
        return this.#groups
    }

    TypeMaterials() {
        return this.#typeMaterials
    }

    Blueprints() {
        return this.#blueprints
    }
}


function findBlueprintFor(type) {
    return SDE.Blueprints().get(type.blueprintTypeID)
}

function getMaterialsFor(activity, type, quantity) {
    //console.log(`getMaterialsFor(${activity}, ${type._key}, ${quantity})`)
    let b = SDE.Blueprints().get(type.blueprintTypeID)
    if (b === undefined)
        return b
    return b.activities[activity].materials
        .map(m => {
            let mt = SDE.Types().get(m.typeID)
            // Constructing new object to avoid changing one in DB
            let rv = {
                ...m,
                'name': mt.name,    // FIXME
                'quantity': m.quantity * quantity
            }
            if (mt.blueprintTypeID)
                rv.materials = getMaterialsFor(activity, mt, m.quantity * quantity)
            return rv
        })
}




const SDE = new SDEDataBase();

let type = SDE.Types().findByName('^Astero$')
type = SDE.Types().get(11567)
console.log(type)



let blueprint = findBlueprintFor(type)
//console.log(blueprint)
let blueprintType = SDE.Types().get(blueprint.blueprintTypeID)
//console.log(blueprintType)
let materials = getMaterialsFor('manufacturing', type, 1)
//console.log(materials.toJSON())
console.log(JSON.stringify(materials,0,2))

//console.log(SDE.Types().findText(/ara/))
