import React, { Fragment } from 'react';
import Bestsellers from './Bestsellers';
import Catalog from './Catalog';

function Main() {
    return (
        <Fragment>
            <main className="container">
                <div className="row">
                    <div className="col">
                        <Bestsellers />
                        <section className='container catalog'>
                            <h2 className='text-center'>Каталог</h2>
                            <Catalog />
                        </section>
                    </div>
                </div>
            </main>
        </Fragment>
    );
}
export default Main;
