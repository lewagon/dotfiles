describe('#evenOrOdd()', () => {
  it('should return even for 0', () => {
    chai.expect(evenOrOdd(0)).to.equal('even');
  });

  it('should return odd for 1', () => {
    chai.expect(evenOrOdd(1)).to.equal('odd');
  });

  it('should return even for 2', () => {
    chai.expect(evenOrOdd(2)).to.equal('even');
  });
});