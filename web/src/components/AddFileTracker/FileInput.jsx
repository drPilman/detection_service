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
        const { input: { value } } = this.props

        return (<input
            type="file"
            value={value}
            accept='.mp4, .avi'
            required
            onChange={this.onChange}
        />)
    }
}

export default FileInput