export function sidebarResponsive({ innerWidth }){
    console.log("Innerwidth ---- ", innerWidth);
    const sidebarNavigation = document.getElementById('sidebar-navigation');

    if(innerWidth <= 991) {
        sidebarNavigation.classList.add("offcanvas");
        sidebarNavigation.classList.add("offcanvas-start");
    }
    else{
        sidebarNavigation.classList.remove("offcanvas");
        sidebarNavigation.classList.remove("offcanvas-start");

        sidebarNavigation.removeAttribute("style");
        sidebarNavigation.removeAttribute("aria-hidden");
    } 
}