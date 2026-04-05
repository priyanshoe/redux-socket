
export default function SideBar() {
    const icons1 = [
        {
            src: "message-icon.svg",
            active: true
        },
        {
            src: 'status-icon.svg',
            active: false
        },
        {
            src: 'broadcast-icon.svg',
            active: false
        },
        {
            src: 'group-icon.svg',
            active: false
        },
    ]
    const icons2 = [
        {
            src: "message-icon.svg",
            active: true
        },
        {
            src: 'status-icon.svg',
            active: false
        },
        {
            src: 'broadcast-icon.svg',
            active: false
        },
        {
            src: 'group-icon.svg',
            active: false
        },
    ]
    return (
        <div className="h-full py-4 px-3 bg-(--sidebar-bg) flex flex-col items-center justify-between">
            <div id="icon-group-1" className="flex flex-col gap-3">
                {
                    icons1.map((item, id) => (
                        <img key={id} src={item.src} height={38} width={38}
                            className={`${item.active ? "bg-gray-300" : ""} rounded-full p-1`} />
                    ))
                }
            </div>

            <div id="icon-group-1" className="flex flex-col gap-2">
                <img src='/setting-icon.svg' height={38} width={38}
                    className={` rounded-full`} />
                <img src='/profile.svg' height={38} width={38}
                    className={` rounded-full`} />

            </div>
        </div>
    )
}