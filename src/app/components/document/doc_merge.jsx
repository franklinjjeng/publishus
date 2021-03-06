import React from 'react';
import { connect } from 'react-redux';

// UI
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

// Components
import MergeSplit from './doc_merge_splitView.jsx';
import MergeUnified from './doc_merge_unifiedView.jsx';

// Store properties
import * as docSummary from './../../actions/docSummaryActions.jsx';

@connect((store) => {
  return {
    reviewChanges: store.docSummary.reviewChanges,
    mergeSplitView: store.docSummary.mergeSplitView
  };
})

export default class Doc_merge extends React.Component {
  constructor(props) {
    super(props);
    this.reviewChanges = this.reviewChanges.bind(this);
    this.cancelComment = this.cancelComment.bind(this);
    this.submitMergeComment = this.submitMergeComment.bind(this);
    this.switchSplitOrUnified = this.switchSplitOrUnified.bind(this);
  }

  reviewChanges(e) {
    this.props.dispatch(docSummary.reviewChanges(e));
  }

  cancelComment() {
    this.props.dispatch(docSummary.cancelComment())
  }

  submitMergeComment(e) {
    e.preventDefault();
    console.log('merge comment!', e.target.name, e.target);
  }

  switchSplitOrUnified() {
    this.props.dispatch(docSummary.switchSplitOrUnified())
  }

  commentBox() {
    if (this.props.reviewChanges.acceptComments) {
      return (
        <div className="merge-comment text-left">
          <div onClick={this.cancelComment} className="btn-exit">x</div>
          <h5 className="mb10">Accept with comments</h5>
          <form onSubmit={this.submitMergeComment}>
            <textarea name="mergeComment" placeholder="Add a comment for this merge"/>
            <input className="btn-purple" type="submit" value="Accept and send" />
            <div onClick={this.cancelComment} className="btn-cancel text-right">cancel</div>
          </form>
        </div>
      )
    } else if (this.props.reviewChanges.declineComments) {
      return (
        <div className="merge-comment text-left">
          <div onClick={this.cancelComment} className="btn-exit">x</div>
          <h5 className="mb10">Decline with comments</h5>
          <form onSubmit={this.submitMergeComment}>
            <textarea name="mergeComment" placeholder="Add a decline comment"/>
            <input className="btn-purple" type="submit" value="Decline and send" />
            <div onClick={this.cancelComment} className="btn-cancel text-right">cancel</div>
          </form>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="doc-merge mt10 mb10">
        <div className="row">
          <div className="col-sm-12">
            <div className="row title-container mt10">
              <div className="col-sm-12">
                <div className="doc-merge-details">
                  <p>franklinjjeng wants to merge changes into this document : “Adding results section with data analysis”</p>
                </div>
              </div>  
            </div>
            <div className="row actions-container mt15">
              <div className="col-sm-12">
                <div className="merge-actions text-center">
                  <div className="row">
                    <div className="col-sm-3 text-left">
                      <p>3 changes in this merge</p>
                    </div>
                    <div className="col-sm-9 text-right">
                      <ButtonGroup className="mr10">
                        <Button onClick={this.switchSplitOrUnified} bsSize="small">Split</Button>
                        <Button onClick={this.switchSplitOrUnified} bsSize="small">Unified</Button>
                      </ButtonGroup>
                      <DropdownButton onSelect={this.reviewChanges} bsSize="small" title="Review changes" id="review-merge">
                        <MenuItem eventKey="acceptQuick">Quick Accept</MenuItem>
                        <MenuItem eventKey="acceptComments">Accept with comments</MenuItem>
                        <MenuItem eventKey="declineComments">Decline with comments</MenuItem>
                      </DropdownButton>
                      {this.commentBox()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row doc-review-container mt10">
              <div className="col-sm-12">
                <div className="doc-review">
                  {this.props.mergeSplitView ? <MergeSplit /> : <MergeUnified />}
                </div>
              </div>
            </div>
          </div>  
        </div>
      </div>
    );
  }
}
