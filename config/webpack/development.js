plugins: [
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') // default value if not specified
        }
    })
]