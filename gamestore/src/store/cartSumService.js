

import { Subject} from 'rxjs';

const cartChanged = new Subject();

export const cartSumService = {
    sendCartSUm: cartSum => cartChanged.next(cartSum),
    getCartSum: () => cartChanged.asObservable()
}