import React from 'react';
import styles from './AboutPage.module.scss';

const AboutPage = (props) =>
{
    return (
        <div className = {styles.aboutpage}>
            <div className = {styles['aboutpage-content']}>
                <h2>About Sarah</h2>
                <hr/>
                <div className = {styles['aboutpage-content-about']}>
                    <img src = "sarahportrait.jpg"/>
                    <p><span className = {styles.tab}></span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis. Fermentum leo vel orci porta non pulvinar neque laoreet. Sem integer vitae justo eget magna fermentum iaculis eu. Eget mauris pharetra et ultrices neque ornare aenean. A pellentesque sit amet porttitor eget dolor morbi. Nunc scelerisque viverra mauris in aliquam sem. Pretium vulputate sapien nec sagittis aliquam. Mauris nunc congue nisi vitae suscipit. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Tellus orci ac auctor augue mauris. Aliquam purus sit amet luctus venenatis.

Dignissim convallis aenean et tortor at risus viverra. Sapien et ligula ullamcorper malesuada proin libero. Risus nec feugiat in fermentum posuere. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor. Viverra tellus in hac habitasse. Senectus et netus et malesuada fames ac turpis. Consectetur purus ut faucibus pulvinar. Sodales ut etiam sit amet nisl purus in mollis. Id aliquet lectus proin nibh nisl. Duis ut diam quam nulla porttitor massa. Felis eget nunc lobortis mattis aliquam. Viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas.Commodo ullamcorper a lacus vestibulum sed arcu. Morbi tincidunt augue interdum velit. Velit scelerisque in dictum non. Egestas maecenas pharetra convallis posuere morbi leo urna molestie at. Consectetur a erat nam at lectus. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus. Nunc aliquet bibendum enim facilisis. Magna fermentum iaculis eu non diam phasellus vestibulum lorem. Aliquet eget sit amet tellus cras adipiscing enim eu. Nisi porta lorem mollis aliquam ut porttitor. Auctor urna nunc id cursus metus aliquam. Sed sed risus pretium quam vulputate dignissim suspendisse in est. Natoque penatibus et magnis dis parturient. Vitae turpis massa sed elementum tempus egestas sed sed. Laoreet non curabitur gravida arcu ac tortor. Imperdiet dui accumsan sit amet nulla. Suspendisse ultrices gravida dictum fusce ut placerat. Vestibulum sed arcu non odio euismod lacinia at.</p>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;