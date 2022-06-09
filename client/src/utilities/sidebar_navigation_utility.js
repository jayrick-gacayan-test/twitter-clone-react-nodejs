export function sidebarResponsive({ innerWidth }){
    console.log("Innerwidth ---- ", innerWidth);
    const sidebarNavigation = document.getElementById('sidebar-navigation')

    if(innerWidth <= 991) sidebarNavigation.classList.add("width-0");
    else sidebarNavigation.classList.remove("width-0");
}