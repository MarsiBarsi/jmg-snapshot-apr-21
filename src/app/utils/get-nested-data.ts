import {Data, Router} from '@angular/router';

export function getNestedData(router: Router): Data {
    let child = router.routerState.root;

    while (child.firstChild) {
        child = child.firstChild;
    }

    return child.snapshot.data;
}
