import AppLogoBanner from './app-logo-banner';
import AppLogoIcon from './app-logo-icon';

export default function AppLogo({ sidebarOpen }) {

    return (
        <>
            {!sidebarOpen
                ? <div className="rounded-md aspect-square size-8">
                    <AppLogoIcon />
                </div>
                : <div>
                    <AppLogoBanner />
                </div>
            }
        </>
    );
}
