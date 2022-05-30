import React from 'react'

class FileInput extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        const { input: { onChange } } = this.props
        onChange(e.target.files[0])

    }

    render() {
        const {input: {value}} = this.props
        return (<input
            type="file"
            required
            accept='.mp4'
            value={value}
        />)
    }
}

export default FileInput