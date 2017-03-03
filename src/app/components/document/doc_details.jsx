import React from 'react';
import { connect } from 'react-redux';

// UI
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';

// Components
import DocContents from './doc_contents.jsx'

//actions
import { retrieveSpecificDoc } from '../../actions/allDocActions.jsx'

export class Doc_details extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const username = this.props.user.username;
    const docID = this.props.doc.docId || 5;
    this.props.dispatch(retrieveSpecificDoc(username, docID));
  }

  render() {
    return (
      <div className="doc-details mt10 mb10">
        <div className="row">
          <div className="col-sm-12">
            <div className="row mt10">
              <div className="col-sm-12">
                <div className="doc-desc">
                  {console.log('this.props.username', this.props.user.username)}                
                  {console.log('this.props.docID', this.props.doc.docId)}  
                  {console.log('this.props.doc.docDescription', this.props.doc.docDescription)}              
                  {this.props.doc.docDescription}
                </div>
              </div>  
            </div>
            <div className="row mt15">
              <div className="col-sm-8">
                <div className="doc-desc-metrics text-center">
                  <div className="row">
                    <div className="col-sm-3">
                      <p>324 saves</p>
                    </div>
                    <div className="col-sm-3">
                      <p>7 copies made</p>
                    </div>
                    <div className="col-sm-3">
                      <p>29 contributors</p>
                    </div>
                    <div className="col-sm-3">
                      {this.props.doc.docType}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 text-right">
                <ButtonGroup>
                  <Button>Merge</Button>
                  <Button>Copy</Button>
                </ButtonGroup>
              </div>
            </div>
            <div className="row mt15">
              <div className="col-sm-12">
                <DocContents />
              </div>
            </div>
          </div>  
        </div>
      </div>
    );
  }
}

export default connect(state => state)(Doc_details);



