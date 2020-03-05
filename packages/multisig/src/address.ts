import { trits, trytes } from '@iota/converter'
import Kerl from '@iota/kerl'
import { asArray } from '../../types'

/**
 * @class Address
 * @memberof module:multisig
 */
// export default class Address {
//     private kerl: Kerl

//     constructor(digests?: string | ReadonlyArray<string>) {
//         a.kerl = new Kerl()
//         a.kerl.initialize()

//         if (digests) {
//             a.absorb(digests)
//         }
//     }
// const a = {};
// a.kerl = new Kerl()
// a.kerl.initialize()
// a.absorb(digests)
export const getAddress = (digests: string | ReadonlyArray<string>) => {
    const k = new Kerl()
    k.initialize()

    /**
     * Absorbs key digests
     *
     * @member absorb
     *
     * @memberof Address
     *
     * @param {string|array} digest digest trytes
     *
     * @return {object} address instance
     */
    const absorb = (digestsinabsorb: string | ReadonlyArray<string>) => {
        // Construct array
        const digestsArray = asArray(digestsinabsorb)
        // const k = new Kerl();
        // k.initialize()

        // Add digests
        for (let i = 0; i < digestsArray.length; i++) {
            // Get trits of digest
            const digestTrits = trits(digestsArray[i])

            // Absorb digest
            k.absorb(digestTrits, 0, digestTrits.length)
        }

        return k
    }
    if (digests) {
        absorb(digests)
    }
    /**
     * Finalizes and returns the multisig address in trytes
     *
     * @member finalize
     *
     * @memberof Address
     *
     * @param {string} digest digest trytes, optional
     *
     * @return {string} address trytes
     */
    const finalize = (digest?: string) => {
        // Absorb last digest if provided
        if (digest) {
            // console.log("digest");
            // k.absorb(digest)
            absorb(digest)
        }

        // Squeeze the address trits
        const addressTrits: Int8Array = new Int8Array(Kerl.HASH_LENGTH)
        k.squeeze(addressTrits, 0, Kerl.HASH_LENGTH)

        // Convert trits into trytes and return the address
        return trytes(addressTrits)
    }
    return finalize()
    // }
}
