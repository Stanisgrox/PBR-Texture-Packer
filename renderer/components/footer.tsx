type Div = JSX.IntrinsicElements['div'];

export const Footer:React.FC<Div> = (props) => {

    return (
        <div 
            className="flex flex-col w-full pt-6 mt-4"
            style={{
                backgroundColor: '#0c1117'
            }}
        >
            <div className="flex w-full justify-around">
                <div>
                    https://discord.gg/WjPVnS7rtg
                </div>
                <div>
                    https://x.com/stanisgrox
                </div>
            </div>
            <div className="text-center mt-4 p-4">
                Copyright 2024, Stanisgrox.
            </div>
        </div>
    )
}